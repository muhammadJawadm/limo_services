import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { SOCKET_URL } from '../config/socket';
import { showAppNotificationToast } from '../utils/notificationToast';
import { useAuthStore } from '../stores/authStore';
import {
	getDriverChatMessages,
	normalizeDriverChatMessage,
} from '../services/driverChatService';

function getMessageKey(message) {
	return message?.id || `${message?.senderId || 'unknown'}-${message?.createdAt || 'missing'}-${message?.text || ''}`;
}

export default function useDriverAdminChat() {
	const { token: authToken, user, role } = useAuthStore();
	const socketRef = useRef(null);
	const userId = user?.id || user?._id || null;

	const [messages, setMessages] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSending, setIsSending] = useState(false);
	const [error, setError] = useState('');
	const [isConnected, setIsConnected] = useState(false);

	const sortedMessages = useMemo(() => {
		return [...messages].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
	}, [messages]);

	const appendMessage = useCallback((message) => {
		setMessages((prev) => {
			const nextMessage = normalizeDriverChatMessage(message, userId);
			const nextKey = getMessageKey(nextMessage);

			if (prev.some((item) => getMessageKey(item) === nextKey)) {
				return prev;
			}

			return [...prev, nextMessage];
		});
	}, [userId]);

	const refreshMessages = useCallback(async () => {
		if (!authToken) {
			setMessages([]);
			setError('');
			setIsConnected(false);
			return;
		}

		setIsLoading(true);
		setError('');

		const result = await getDriverChatMessages();

		if (result.success && Array.isArray(result.data)) {
			setMessages(result.data.map((message) => normalizeDriverChatMessage(message, userId)));
		} else {
			setMessages([]);
			setError(result.message || 'Failed to load messages.');
		}

		setIsLoading(false);
	}, [authToken, userId]);

	useEffect(() => {
		if (!authToken) {
			socketRef.current?.disconnect?.();
			socketRef.current = null;
			const resetTimer = window.setTimeout(() => {
				setMessages([]);
				setIsLoading(false);
				setIsConnected(false);
				setError('');
			}, 0);

			return () => window.clearTimeout(resetTimer);
		}

		let isMounted = true;
		const socket = io(SOCKET_URL, {
			auth: { token: authToken },
			transports: ['websocket'],
		});

		socketRef.current = socket;

		const handleAdminNewMessage = (payload) => {
			if (!isMounted) return;

			const incomingMessage = payload?.data || payload?.message || payload;
			appendMessage(incomingMessage);

			// Only show notification for incoming messages, not sender's own messages
			if (incomingMessage?.senderId !== userId) {
				const preview = incomingMessage?.text || 'You have a new message';
				toast.success(`Admin: ${preview}`, { duration: 4000 });
			}
		};

		const handleNotification = (notification) => {
			if (!isMounted) return;
			showAppNotificationToast(notification, { preset: 'driverChat' });
		};

		socket.on('connect', () => {
			if (!isMounted) return;
			setIsConnected(true);
		});

		socket.on('disconnect', () => {
			if (!isMounted) return;
			setIsConnected(false);
		});

		socket.on('connect_error', () => {
			if (!isMounted) return;
			setIsConnected(false);
		});

		socket.on('admin_new_message', handleAdminNewMessage);
		socket.on('notification', handleNotification);

		const loadTimer = window.setTimeout(() => {
			refreshMessages();
		}, 0);

		return () => {
			isMounted = false;
			window.clearTimeout(loadTimer);
			socket.off('admin_new_message', handleAdminNewMessage);
			socket.off('notification', handleNotification);
			socket.off('connect');
			socket.off('disconnect');
			socket.off('connect_error');
			socket.disconnect();
			socketRef.current = null;
		};
	}, [authToken, appendMessage, refreshMessages]);

	const sendMessage = useCallback(async (text) => {
		if (!text?.trim()) {
			return false;
		}

		if (!userId) {
			setError('Driver profile is not ready yet. Please try again.');
			return false;
		}

		if (!socketRef.current?.connected) {
			setError('Not connected. Please wait...');
			return false;
		}

		setIsSending(true);
		setError('');

		try {
			socketRef.current.emit('admin_send_message', {
				driverUserId: userId,
				text: text.trim(),
			});

			window.setTimeout(() => {
				refreshMessages();
			}, 250);

			setIsSending(false);
			return true;
		} catch (err) {
			console.error('Failed to emit admin_send_message:', err);
			setError('Failed to send message.');
			setIsSending(false);
			return false;
		}
	}, [refreshMessages, userId]);

	return {
		role,
		userId,
		messages: sortedMessages,
		isLoading,
		isSending,
		error,
		isConnected,
		sendMessage,
		refreshMessages,
	};
}
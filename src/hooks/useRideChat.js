import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import toast from 'react-hot-toast';
import { getRideChatMessages } from '../services/chatService';
import { useAuthStore } from '../stores/authStore';

import { SOCKET_URL } from '../config/socket';

const normalizeMessage = (message, currentUserId) => ({
  id: message.id,
  text: message.text,
  senderId: message.senderId,
  senderRole: message.senderRole,
  createdAt: message.createdAt ? new Date(message.createdAt) : new Date(),
  isOwn: message.senderId === currentUserId,
  sender: message.sender || null,
});

export default function useRideChat(rideId) {
  const { token: authToken, user, role } = useAuthStore();

  const socketRef = useRef(null);

  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isConnected, setIsConnected] = useState(false);

  const userId = user?.id || user?._id || null;

  const sortedMessages = useMemo(() => {
    return [...messages].sort(
      (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
    );
  }, [messages]);

  const appendMessage = useCallback((message) => {
    setMessages((prev) => {
      if (prev.some((item) => item.id === message.id)) return prev;
      return [...prev, message];
    });
  }, []);

  useEffect(() => {
    if (!rideId || !authToken) {
      const resetTimer = window.setTimeout(() => {
        setMessages([]);
        setIsConnected(false);
      }, 0);

      return () => window.clearTimeout(resetTimer);
    }

    let isMounted = true;

    const loadMessages = async () => {
      try {
        setIsLoading(true);
        setError('');

        const result = await getRideChatMessages(rideId);

        if (!isMounted) return;

        if (result.success && Array.isArray(result.data)) {
          setMessages(result.data.map((msg) => normalizeMessage(msg, userId)));
        } else {
          setError(result.message || 'Failed to load messages');
        }
      } catch (err) {
        if (isMounted) {
          console.error('loadMessages error:', err);
          setError('Failed to load messages');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMessages();

    const socket = io(SOCKET_URL, {
      auth: { token: authToken },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('✅ Socket connected:', socket.id);
      setIsConnected(true);
      socket.emit('join_ride', { rideId });
    });

    socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected');
      setIsConnected(false);
    });

    socket.on('connect_error', (err) => {
      console.error('Socket connect error:', err.message);
      setIsConnected(false);
    });

    socket.on('new_message', (message) => {
      if (!isMounted) return;

      console.log('📨 New message received:', message);
      const normalizedMsg = normalizeMessage(message, userId);
      
      // Only show notification for incoming messages, not sender's own messages
      if (message.senderId !== userId) {
        const senderName = message?.sender?.name || message?.sender?.fullName || 'New message';
        const preview = message?.text || 'You have a new message';
        toast.success(`${senderName}: ${preview}`, { duration: 4000 });
      }
      
      appendMessage(normalizedMsg);
    });

    return () => {
      isMounted = false;
      socket.off('new_message');
      socket.off('connect');
      socket.off('disconnect');
      socket.off('connect_error');
      socket.disconnect();
      socketRef.current = null;
    };
  }, [rideId, authToken, userId, appendMessage]);

  const sendMessage = useCallback(
    (text) => {
      if (!text?.trim()) {
        console.warn('sendMessage: empty text');
        return false;
      }

      if (!socketRef.current?.connected) {
        console.warn('sendMessage: socket not connected');
        setError('Not connected. Please wait...');
        return false;
      }

      try {
        socketRef.current.emit('send_message', {
          rideId,
          text: text.trim(),
        });
        return true;
      } catch (err) {
        console.error('❌ Failed to send message:', err);
        setError('Failed to send message');
        return false;
      }
    },
    [rideId]
  );

  return {
    role,
    userId,
    messages: sortedMessages,
    isLoading,
    error,
    isConnected,
    sendMessage,
  };
}
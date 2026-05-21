import { useEffect, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { useAuthStore } from '../stores/authStore';
import { SOCKET_URL } from '../config/socket';
import { showAppNotificationToast } from '../utils/notificationToast';

let socketInstance = null;

export function useSocket() {
  const token = useAuthStore((state) => state.token);
  const socketRef = useRef(null);
  const [, forceUpdate] = useState(0);

  useEffect(() => {
    if (!token) {
      if (socketInstance) {
        socketInstance.off('notification');
        socketInstance.disconnect();
        socketInstance = null;
      }

      socketRef.current = null;
      forceUpdate((value) => value + 1);
      return;
    }

    if (socketInstance) {
      socketRef.current = socketInstance;
      forceUpdate((value) => value + 1);
      return;
    }

    const socket = io(SOCKET_URL, {
      auth: { token },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('connect_error', (err) => console.error('Socket error:', err.message));

    socket.on('notification', (notification) => showAppNotificationToast(notification));

    socketInstance = socket;
    socketRef.current = socket;
    forceUpdate((value) => value + 1);
  }, [token]);

  return socketInstance;
}
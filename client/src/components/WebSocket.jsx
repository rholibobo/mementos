import React, { useState, useEffect } from 'react';

function WebSocketComponent({ url, onMessage }) {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = new WebSocket(url);
    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [url]);

  useEffect(() => {
    if (socket) {
      socket.onmessage = (event) => {
        onMessage(event.data);
      };
      socket.onerror = (error) => {
        console.error('WebSocket connection error:', error);
      };
      socket.onclose = (event) => {
        console.log('WebSocket connection closed:', event.code, event.reason);
      };
      socket.onopen = () => {
        console.log('WebSocket connection established');
      };
    }
  }, [socket, onMessage]);

  return null;
}

export default WebSocketComponent;

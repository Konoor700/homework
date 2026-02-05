import { io } from 'socket.io-client';


const SOCKET_BASE_URL = 'https://playground.zenberry.one'; 
const SOCKET_URL = `${SOCKET_BASE_URL}/notifications`;

const token = localStorage.getItem('token');

export const socket = io(SOCKET_URL, {
  transports: ['websocket'],
  autoConnect: true, 
  reconnection: true, 
  reconnectionDelay: 1000,
  extraHeaders: token ? {
    Authorization: `Bearer ${token}`
  } : undefined
});
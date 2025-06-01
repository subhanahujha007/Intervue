import { io } from "socket.io-client";
const socket = io("https://server-intervue.vercel.app/"); 
export default socket;
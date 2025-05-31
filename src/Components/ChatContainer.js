import React, { useEffect } from "react";
import socket from "../socket";
import ChatPopup from "./Chatpopup";
import { useChat } from "../Context/ChatProvider";

const ChatContainer = ({ name }) => {
  const { messages, setMessages } = useChat();

  useEffect(() => {
  const handleReceive = (data) => {
    setMessages((prev) => [...prev, data]);
  };

  const handleHistory = (history) => {
    setMessages(history);
  };

  socket.on("receive-message", handleReceive);
  socket.on("chat-history", handleHistory);

  socket.emit("get-chat-history");

  return () => {
    socket.off("receive-message", handleReceive);
    socket.off("chat-history", handleHistory);
  };
}, [setMessages]);

  return <ChatPopup name={name} messages={messages} setMessages={setMessages} />;
};

export default ChatContainer;
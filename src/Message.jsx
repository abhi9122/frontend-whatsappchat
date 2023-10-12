import React from "react";
import MessageList from "./MessageList";

const Message = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    return (
      <div className="py-4">
        <h1 className="text-4xl font-bold mb-4">Please login</h1>
      </div>
    );
  }

  return (
    <div className="py-4">
      <MessageList />
    </div>
  );
};

export default Message;

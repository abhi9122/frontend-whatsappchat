import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./baseUrl";

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`${baseUrl}api/messages/list/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });

        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  if (!messages) {
    return <div>Loading...</div>;
  }
  return (
    <div className="py-8 text-left">
      <h1 className="text-4xl font-bold mb-4">List of Messages</h1>
      <div className=" text-left bg-white rounded shadow-lg">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-20 text-center border">Date</th>
              <th className="py-2 px-4 border">Message</th>
              <th className="py-2 px-4 border">Customer ID</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message.id}>
                <td className="py-2 px-4 text-center border">{formatDate(message.created)}</td>
                <td className="py-2 px-4 border">{message.message}</td>
                <td className="py-2 px-4 border">{message.customer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MessageList;

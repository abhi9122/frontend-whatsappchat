import React, { useState, useEffect } from "react";
import Login from "./Login";
import Chatbot from "./Chatbot";
import Messages from "./Message";
import Questions from "./Questions";

const LoginComponent = () => {
  return (
    <div className="py-4 min-h-[70vh] flex justify-center items-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 ">Please Login First!</h1>
      </div>
    </div>
  );
};

const Tab = () => {
  const [activeTab, setActiveTab] = useState("login");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      setActiveTab("chatbot");
    }
  }, [token]);
  const handleClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="p-4">
      <div className="flex">
        {!token && (
          <div
            className={`px-4 py-2 cursor-pointer ${
              activeTab === "login" ? "bg-blue-500 text-white" : "bg-gray-300"
            } `}
            onClick={() => handleClick("login")}
          >
            Login
          </div>
        )}
        <div
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "chatbot" ? "bg-blue-500 text-white" : "bg-gray-300"
          } `}
          onClick={() => handleClick("chatbot")}
        >
          Chatbot
        </div>
        <div
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "messages" ? "bg-blue-500 text-white" : "bg-gray-300"
          } `}
          onClick={() => handleClick("messages")}
        >
          Messages
        </div>
        <div
          className={`px-4 py-2 cursor-pointer ${
            activeTab === "questions" ? "bg-blue-500 text-white" : "bg-gray-300"
          } `}
          onClick={() => handleClick("questions")}
        >
          Questions
        </div>
        {token && (
          <div
            className="px-4 py-2 cursor-pointer bg-gray-300"
            onClick={() => {
              localStorage.removeItem("token");
              window.location.href = "/";
              //   setActiveTab("login");
            }}
          >
            Logout
          </div>
        )}
      </div>

      <div className="mt-4">
        {!token && activeTab === "login" && <Login />}
        {activeTab === "chatbot" && (token ? <Chatbot /> : <LoginComponent />)}
        {activeTab === "messages" &&
          (token ? <Messages /> : <LoginComponent />)}
        {activeTab === "questions" &&
          (token ? <Questions /> : <LoginComponent />)}
      </div>
    </div>
  );
};

export default Tab;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "./baseUrl";
import ChatbotUpdate from "./ChatbotUpdate";

const Chatbot = () => {
  const [chatbotData, setChatbotData] = useState(null);
  const [isOpened, setIsOpened] = useState(false);
  const [isUpdatedChatbot, setIsUpdatedChatbot] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}api/chatbots/3867c9a6-a838-48f1-b0df-51b0eb1cf58f/`,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );

        setChatbotData(response.data[0]);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [isOpened]);

  if (!chatbotData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="py-4 text-left border-b border-gray-300">
        <h1
          className="text-5xl font-bold py-4 pb-6"
          style={{ lineHeight: "49px" }}
        >
          Hi, I'm{" "}
          <span className="text-indigo-700 font-extrabold">
            {chatbotData.name}
          </span>
          !<br /> I am whatsapp chatbot
        </h1>
        <p className="bg-indigo-600 text-white py-1 px-2 rounded-full inline-block  mb-4">
          {chatbotData.type}
        </p>

        <p className="text-lg pt-4 font-bold">
          You can change greeting message when user start conversation with
          chatbot.
        </p>
        <p className="pt-2 text-lg font-bold">Message template:</p>
        <p className="mb-4 pb-4"> {chatbotData.greet_template}</p>
        <h2 className="text-3xl font-bold mb-2">Questions:</h2>
        <ul>
          {chatbotData.questions.map((question) => (
            <li key={question.id} className="mb-2">
              <h3 className="font-bold">{question.question}</h3>
              <p>{question.answer}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="py-8 text-left">
        <p className="text-lg pb-3 font-bold">
          Do you want to update chatbot configurations?
        </p>
        <button
          className="bg-indigo-700 text-white py-2 px-3 rounded-md inline-block"
          onClick={() => setIsOpened(!isOpened)}
        >
          Update Chatbot
        </button>
        {isOpened && (
          <ChatbotUpdate
            chatbotData={chatbotData}
            setChatbotData={setChatbotData}
            setIsOpened={setIsOpened}
            setIsUpdatedChatbot={setIsUpdatedChatbot}
          />
        )}
        {isUpdatedChatbot && (
          <p className="text-green-500">Chatbot updated successfully!</p>
        )}
      </div>
    </>
  );
};

export default Chatbot;

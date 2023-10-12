import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, chatBotId } from "./baseUrl";

const ChatbotUpdate = ({
  chatbotData,
  setChatbotData,
  setIsOpened,
  setIsUpdatedChatbot,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    greet_template: "",
  });
  const [isUpdated, setIsUpdated] = useState(false);

  const { name, type, greet_template } = chatbotData;
  console.log(greet_template);
  useEffect(() => {
    setFormData({
      name,
      type,
      greet_template,
    });
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    axios
      .patch(`${baseUrl}api/chatbots/${chatBotId}/update/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("Chatbot updated successfully:", response.data);
        setChatbotData(response.data);
        setIsUpdated(true);
        setIsUpdatedChatbot(true);
      })
      .catch((error) => {
        console.error("Error updating chatbot:", error);
      });

    setIsOpened(false);
  };

  return (
    <div className="py-8 text-left max-w-xl">
      <h1 className="text-4xl font-bold mb-4">Update Chatbot</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-gray-900 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
            type="text"
            placeholder="Type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="greet_template"
          >
            Greet Template
          </label>
          <textarea
            className="shadow appearance-none border min-h-[150px] max-h-[400px] rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="greet_template"
            placeholder="Greet Template"
            name="greet_template"
            value={formData.greet_template}
            onChange={handleChange}
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="type"
          >
            Type
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="">Select a type</option>
            <option value="CUSTOMER_SUPPORT">CUSTOMER_SUPPORT</option>
            <option value="SALES">SALES</option>
            <option value="PRODUCT_RECOMENDATION">PRODUCT_RECOMENDATION</option>
            <option value="WELCOME">WELCOME</option>
          </select>
        </div>
        <button
          className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Update Chatbot
        </button>
      </form>
      {isUpdated && (
        <p className="text-green-500 font-bold mt-6 text-lg">
          Chatbot updated!
        </p>
      )}
    </div>
  );
};

export default ChatbotUpdate;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl, chatBotId } from "./baseUrl";

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    question: "",
    answer: "",
    chatbot_id: chatBotId,
  });
  const chatbot_id = chatBotId;
  useEffect(() => {
    fetchQuestions();
  }, []);

  const token = localStorage.getItem("token");

  const fetchQuestions = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}api/chatbots/${chatbot_id}/questions/list/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setQuestions(response.data);
    } catch (error) {
      console.error("Error fetching questions:", error);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (formData.id) {
        await axios.patch(
          `${baseUrl}api/chatbots/${formData.id}/questions/update/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      } else {
        await axios.post(
          `${baseUrl}api/chatbots/${chatbot_id}/questions/`,
          formData,
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );
      }

      setFormData({
        id: "",
        question: "",
        answer: "",
        chatbot_id: "dfe248fe-4f0e-4db5-91b4-2f74411727e3",
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error adding/updating question:", error);
    }
  };

  const handleEdit = (question) => {
    setFormData(question);
  };

  const handleDelete = async (id) => {
    // delete logic
    console.log("Delete question with id:", id);
  };

  return (
    <div className="p-8  text-left  bg-white rounded shadow-lg">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="question"
            className="block text-gray-700 font-bold mb-2"
          >
            Question
          </label>
          <input
            type="text"
            id="question"
            name="question"
            value={formData.question}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="answer"
            className="block text-gray-700 font-bold mb-2"
          >
            Answer
          </label>
          <input
            type="text"
            id="answer"
            name="answer"
            value={formData.answer}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {formData.id ? "Update Question" : "Add Question"}
        </button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Questions List</h2>
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="py-2 px-4 border">ID</th>
            <th className="py-2 px-4 border">Question</th>
            <th className="py-2 px-4 border">Answer</th>
            <th className="py-2 px-4 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td className="py-2 px-4 border">{question.id}</td>
              <td className="py-2 px-4 border">{question.question}</td>
              <td className="py-2 px-4 border">{question.answer}</td>
              <td className="py-2 px-4 border flex items-start justify-center">
                <button
                  className="text-blue-600 hover:underline"
                  onClick={() => handleEdit(question)}
                >
                  Edit
                </button>
                <button
                  className="text-red-600 hover:underline ml-2 disabled:cursor-not-allowed"
                  disabled={true}
                  onClick={() => handleDelete(question.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Questions;

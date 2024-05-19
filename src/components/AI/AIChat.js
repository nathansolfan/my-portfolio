import React, { useEffect, useState } from "react";
import axios from "axios";
import "../Styles/AIChat.css";
import ChatResponse from "./ChatResponse";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState(() => {
    const savedResponses = localStorage.getItem("responses");
    return savedResponses ? JSON.parse(savedResponses) : [];
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  useEffect(() => {
    localStorage.setItem("responses", JSON.stringify(responses));
  }, [responses]);

  const handleInputChange = (e) => {
    setPrompt(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError("Prompt cannot be empty.");
      return;
    }
    setIsLoading(true);
    setResponses([]);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8000/index.php",
        { prompt: prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponses([response.data.story]);
      setPrompt("");
      setCharCount(0);
      setIsLoading(false);
    } catch (error) {
      console.error("Failed to fetch response from PHP server", error);
      setError("Failed to fetch response from server. Please try again.");
      setIsLoading(false);
    }
  };

  const handleDeleteResponse = (index) => {
    const newResponses = responses.filter((_, i) => i !== index);
    setResponses(newResponses);
  };

  const handleClearResponses = () => {
    setResponses([]);
  };

  return (
    <div className="chat-container">
      <form onSubmit={handleFormSubmit}>
        <textarea
          className="chat-input"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your theme or start of a story..."
          maxLength={500}
        ></textarea>
        <div className="char-counter">{charCount} / 500</div>
        <button type="submit" disabled={isLoading}>
          Tell Story
        </button>
      </form>

      <button
        onClick={handleClearResponses}
        disabled={isLoading || responses.length === 0}
      >
        Clear All Responses
      </button>

      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          {responses.map((response, index) => (
            <ChatResponse
              key={index}
              response={response}
              onDelete={() => handleDeleteResponse(index)}
            />
          ))}
          {error && <div className="error">{error}</div>}
        </>
      )}
    </div>
  );
}

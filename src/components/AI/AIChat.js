import React, { useEffect, useState, useCallback } from "react";
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
    const inputValue = e.target.value;
    setPrompt(inputValue);
    setCharCount(inputValue.length);

    if (!inputValue.trim()) {
      setError("Prompt cannot be empty.");
    } else if (inputValue.length > 500) {
      setError("Prompt exceeds the maximum length.");
    } else {
      setError("");
    }
  };

  const fetchStory = useCallback(async (prompt) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/index.php",
        { prompt },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setResponses((prevResponses) => [...prevResponses, response.data.story]);
    } catch (error) {
      console.error("Failed to fetch response from PHP server", error);
      setError("Failed to fetch response from server. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (error) {
      return;
    }
    setIsLoading(true);
    fetchStory(prompt);
    setPrompt("");
    setCharCount(0);
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
        <button type="submit" disabled={isLoading || error}>
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

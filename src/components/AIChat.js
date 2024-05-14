import React, { useState } from "react";
import axios from "axios";
import "./Styles/AIChat.css";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [charCount, setCharCount] = useState(0);

  const handleInputChange = async (e) => {
    e.preventDefault();
    setIsLoading(true); //loading
    setResponses([]); //clear previous
    setError(""); // clear previous

    setPrompt(e.target.value);
    setCharCount(e.target.value.length);

    try {
      // Example of how you might adjust your axios POST request in React
      axios
        .post(
          "http://localhost:8000/index.php",
          { prompt: prompt },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((response) => {
          setResponses([...responses, response.data.story]); // Accumulate stories in the array
          setPrompt("");
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Failed to fetch response from PHP server", error);
          setIsLoading(false);
        });
    } catch (error) {
      console.error("Failed to fetch response from OpenAI", error);
      setError("Failed to fetch response from server. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-container">
      <form onSubmit={handleInputChange}>
        <textarea
          className="chat-input"
          value={prompt}
          onChange={handleInputChange}
          placeholder="Enter your theme or start of a story..."
        ></textarea>
        <div className="char-counter">{charCount} / 500</div>{" "}
        {/* Adjust max characters as needed */}
        <button type="submit">Tell Story</button>
      </form>
      {isLoading ? (
        <div className="spinner"></div>
      ) : (
        <>
          {responses.map((response, index) => (
            <div key={index} className="chat-response">
              Response: {response}
            </div>
          ))}
          {error && <div className="error">{error}</div>}
        </>
      )}

      <div>
        <p>Test</p>
      </div>
    </div>
  );
}

// const result = await axios.post(
//   "https://api.openai.com/v1/engines/text-davinci-002/completions", // Update this URL if necessary
//   {
//     prompt: prompt,
//     max_tokens: 150,
//   },
//   {
//     headers: {
//       Authorization: `Bearer ${apiKey}`,
//       "Content-Type": "application/json",
//     },
//   }
// );
// setResponses([...responses, result.data.choices[0].text]); // Store all responses
// setPrompt(""); // Optionally clear the input after receiving the response

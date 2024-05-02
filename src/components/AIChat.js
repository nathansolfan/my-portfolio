import React, { useState } from "react";
import axios from "axios";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const handleInputChange = async (e) => {
    e.preventDefault();

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Correctly access the API key

    try {
      const result = await axios.post(
        "https://api.openai.com/v1/engines/gpt-4-turbo/completions",
        {
          prompt: prompt,
          max_tokens: 150,
        },
        {
          headers: {
            Authorization: `Bearer ${apiKey}`, // Use apiKey here
            "Content-Type": "application/json",
          },
        }
      );

      setResponse(result.data.choices[0].text);
      setPrompt(""); // Clear the input after receiving the response
    } catch (error) {
      console.error("Failed to fetch response from OpenAI", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleInputChange}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt here..."
        ></textarea>
        <button type="submit">Send</button>
      </form>
      {response && <div>Response: {response}</div>}
    </div>
  );
}

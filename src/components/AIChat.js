import React, { useState } from "react";
import axios from "axios";

export default function AIChat() {
  const [prompt, setPrompt] = useState("");
  const [responses, setResponses] = useState([]);

  const handleInputChange = async (e) => {
    e.preventDefault();

    const apiKey = process.env.REACT_APP_OPENAI_API_KEY; // Ensure this matches your .env file
    try {
      // Example of how you might adjust your axios POST request in React
      axios
        .post("http://yourserver.com/proxy.php", { prompt: prompt })
        .then((response) => {
          setResponses(response.data.story);
          setPrompt("");
        })
        .catch((error) => {
          console.error("Failed to fetch response from PHP server", error);
        });
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
          placeholder="Enter your theme or start of a story..."
        ></textarea>
        <button type="submit">Tell Story</button>
      </form>
      {responses.map((response, index) => (
        <div key={index}>Response: {response}</div>
      ))}
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

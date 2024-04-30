import React from "react";
import axios from "axios";

export default function openai() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    const userInput = { role: "user", content: input };

    try {
      const response = await axios.post("/chat-completion", {
        messages: [...messages, userInput],
      });
      setMessages([
        ...messages,
        userInput,
        {
          role: "assistant",
          content: response.data.choices[0].message.content,
        },
      ]);
      setInput("");
    } catch (error) {
      console.error("Error fetching chat completion:", error);
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}

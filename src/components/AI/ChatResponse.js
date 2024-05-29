import React from "react";

const ChatResponse = ({ response, onDelete }) => (
  <div className="chat-response">
    <p>{response}</p>
    <button className="delete-button" onClick={onDelete}>
      Delete
    </button>
  </div>
);

export default ChatResponse;

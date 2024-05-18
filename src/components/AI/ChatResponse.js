import React from "react";

export default function ChatResponse({ response, onDelete }) {
  return (
    <div>
      Response: {response}
      <button onClick={onDelete}>Delete</button>
    </div>
  );
}

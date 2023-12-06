import React, { useState } from 'react';

const TextInputForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    console.log("im in tif");
    e.preventDefault();
    onSubmit(text);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text..."
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default TextInputForm;

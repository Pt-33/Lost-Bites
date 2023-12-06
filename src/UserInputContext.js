// UserInputContext.js
import React from 'react';
import { createContext, useContext, useState } from 'react';


// UserInputContext.js
const UserInputContext = createContext({ userInput: '', setUserInput: () => {} });

export const useUserInput = () => useContext(UserInputContext);

export const UserInputProvider = ({ children }) => {
  const [userInput, setUserInput] = useState('');

  return (
    <UserInputContext.Provider value={{ userInput, setUserInput }}>
      {children}
    </UserInputContext.Provider>
  );
};

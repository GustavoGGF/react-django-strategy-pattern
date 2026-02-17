import { useState } from "react";
import { InputDataFileContext } from "./InputDataFileContext";

export const InputDataFileProvider = ({ children }) => {
  const [existFile, setExistFile] = useState(false);

  const [selectedFile, setSelectedFile] = useState(null);

  return (
    <InputDataFileContext.Provider
      value={{
        existFile,
        setExistFile,
        selectedFile,
        setSelectedFile,
      }}
    >
      {children}
    </InputDataFileContext.Provider>
  );
};

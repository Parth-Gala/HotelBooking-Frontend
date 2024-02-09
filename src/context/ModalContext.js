import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export const useModalContext = () => useContext(ModalContext);

export const ModalProvider = ({ children }) => {
  const [isCongratsModalOpen, setCongratsModalOpen] = useState(false);
  return (
    <ModalContext.Provider value={{ isCongratsModalOpen, setCongratsModalOpen }}>
      {children}
    </ModalContext.Provider>
  );
};

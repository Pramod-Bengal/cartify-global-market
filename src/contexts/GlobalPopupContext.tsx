import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PopupContent {
  title: string;
  description?: string;
  content: ReactNode;
}

interface GlobalPopupContextType {
  isOpen: boolean;
  popupContent: PopupContent | null;
  openPopup: (content: PopupContent) => void;
  closePopup: () => void;
}

const GlobalPopupContext = createContext<GlobalPopupContextType | undefined>(undefined);

export const GlobalPopupProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [popupContent, setPopupContent] = useState<PopupContent | null>(null);

  const openPopup = (content: PopupContent) => {
    setPopupContent(content);
    setIsOpen(true);
  };

  const closePopup = () => {
    setIsOpen(false);
    setPopupContent(null);
  };

  return (
    <GlobalPopupContext.Provider value={{ isOpen, popupContent, openPopup, closePopup }}>
      {children}
    </GlobalPopupContext.Provider>
  );
};

export const useGlobalPopup = () => {
  const context = useContext(GlobalPopupContext);
  if (context === undefined) {
    throw new Error('useGlobalPopup must be used within a GlobalPopupProvider');
  }
  return context;
};


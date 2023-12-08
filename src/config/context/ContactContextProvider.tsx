/* eslint-disable react/jsx-no-constructed-context-values */
import React, { createContext, useState, useEffect } from "react";

interface ContactProp {
  isMobile: boolean;
  setIsMobile: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ContactContext = createContext<ContactProp | null>(null);

interface ContactContextProp {
  children: React.ReactElement;
}

const ContactContextProvider: React.FC<ContactContextProp> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.matchMedia("(max-width: 840px)").matches);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 840);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  return (
    <ContactContext.Provider
      value={{
        isMobile,
        setIsMobile,
      }}
    >
      {children}
    </ContactContext.Provider>
  );
};

export default ContactContextProvider;

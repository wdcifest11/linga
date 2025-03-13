import { createContext, useState, useEffect, ReactNode } from "react";

const AccountContext = createContext({
  username: "Self",
  userid: "11111",
  profilepic: "/placeholder.png",
});

const IsMobileContext = createContext(false);

interface IsMobileProviderProps {
  children: ReactNode;
}

const IsMobileProvider: React.FC<IsMobileProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 500);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 540);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <IsMobileContext.Provider value={isMobile}>
      {children}
    </IsMobileContext.Provider>
  );
};

export { AccountContext, IsMobileContext, IsMobileProvider };

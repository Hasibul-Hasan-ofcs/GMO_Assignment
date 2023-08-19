import { createContext, useState } from "react";

interface Props {
  children: React.ReactElement;
}

type ContextType = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const MainContext = createContext<ContextType | null>(null);

const ContextProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  const contextInfo = {
    open,
    setOpen,
  };

  return (
    <MainContext.Provider value={contextInfo}>{children}</MainContext.Provider>
  );
};

export default ContextProvider;

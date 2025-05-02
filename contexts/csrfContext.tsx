import { createContext, useContext, useState } from "react";

interface CsrfContextType {
  csrfToken: string | null;
  setCsrfToken: (token: string | null) => void;
}

const CsrfContext = createContext<CsrfContextType | undefined>(undefined);

export const CsrfProvider = ({ children }: { children: React.ReactNode }) => {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);
  const value = { csrfToken, setCsrfToken };
  return <CsrfContext.Provider value={value}>{children}</CsrfContext.Provider>;
};

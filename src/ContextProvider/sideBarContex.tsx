"use client";
import React, { ReactNode, useContext, useState } from "react";
import { createContext } from "react";

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const sideBarContext = createContext<SideBarProps | undefined>(undefined);

export const SideBarProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const toggleSidebar = () => setIsOpen((prev) => !prev);

  return (
    <sideBarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </sideBarContext.Provider>
  );
};

export const useSideBar = () => {
  const context = useContext(sideBarContext);

  if (!context)
    throw new Error("useSidebar must be used within SidebarProvider");

  return context;
};

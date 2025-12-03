import React from "react";
import "./background.css"; // Arquivo de estilo com a imagem

const Layout = ({ children }) => {
  return <div className="app-background">{children}</div>;
};

export default Layout;

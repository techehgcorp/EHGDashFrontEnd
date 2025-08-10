"use client";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null; // Evita erros de renderização no servidor

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div style={{ cursor: "pointer", fontSize: "20px" }} onClick={toggleTheme}>
      {theme === "light" ? <SunOutlined /> : <MoonOutlined />}
    </div>
  );
};

export default ThemeSwitch;

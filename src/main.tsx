import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.scss' // Updated from .css to .scss
import { ThemeProvider } from "next-themes"

createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="system" attribute="class">
    <App />
  </ThemeProvider>
);

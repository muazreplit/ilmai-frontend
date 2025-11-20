import { ThemeProvider } from "./components/theme-provider";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import ChatArea from "./components/ChatArea";
import { useState } from "react";

function App() {
  const [activeMode, setActiveMode] = useState("IlmAI Pro 1.0");

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="flex flex-col h-screen bg-background text-foreground transition-colors duration-300">
        <Header />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar onModeSelect={setActiveMode} />
          <ChatArea activeMode={activeMode} />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;

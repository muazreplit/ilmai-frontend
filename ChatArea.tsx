import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, User, Bot, Paperclip, Mic, Image as ImageIcon, Globe, ChevronDown, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { 
    DropdownMenu, 
    DropdownMenuContent, 
    DropdownMenuItem, 
    DropdownMenuTrigger 
  } from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "ai";
  text: string;
  model?: string;
}

interface ChatAreaProps {
  activeMode: string;
}

export default function ChatArea({ activeMode }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "ai", text: "As-salamu alaykum! I am IlmAI. How can I assist you with your Islamic studies?", model: "IlmAI Pro" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
    
    const userMessage = input;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      
      setMessages(prev => [...prev, { 
        role: "ai", 
        text: data.reply,
        model: activeMode 
      }]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to connect to IlmAI. Please try again later.",
        variant: "destructive"
      });
      // Remove the user message if it failed? Or just leave it. Leaving it is better.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex-1 flex flex-col bg-background relative h-full overflow-hidden">
      {/* Top Bar - Increased opacity for better text legibility */}
      <div className="absolute top-0 left-0 right-0 h-16 flex items-center justify-between px-6 z-10 bg-background/80 backdrop-blur-md border-b border-border/5">
        {/* Model Selector */}
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-3 py-1.5 hover:bg-accent rounded-lg text-sm font-medium transition-colors group border border-transparent hover:border-border/50 outline-none focus-visible:ring-2 focus-visible:ring-primary/20">
                <span className="text-muted-foreground group-hover:text-foreground">Mode:</span>
                <span className="text-primary font-semibold">{activeMode}</span>
                <ChevronDown className="h-3 w-3 text-muted-foreground" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-56 p-1 rounded-xl border-border/50 shadow-xl bg-card/95 backdrop-blur-xl">
                <DropdownMenuItem className="rounded-lg focus:bg-accent cursor-pointer py-2">
                    <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-primary">IlmAI Pro 1.0</span>
                        <span className="text-xs text-muted-foreground">Best for complex reasoning</span>
                    </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="rounded-lg focus:bg-accent cursor-pointer py-2">
                    <div className="flex flex-col gap-0.5">
                        <span className="font-medium">IlmAI Fast</span>
                        <span className="text-xs text-muted-foreground">Quick, concise answers</span>
                    </div>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>

        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full w-9 h-9 hover:bg-accent hover:text-foreground text-muted-foreground border border-transparent hover:border-border/50 transition-all"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 md:p-0 space-y-8 pt-24 pb-32 scroll-smooth" ref={scrollRef}>
        <div className="max-w-3xl mx-auto w-full px-4 md:px-0 space-y-8">
            {messages.map((m, i) => (
            <div
                key={i}
                className={`flex gap-4 md:gap-6 ${
                m.role === "user" ? "justify-end" : "justify-start"
                }`}
            >
                {m.role === "ai" && (
                <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1 shadow-sm select-none">
                    <Bot className="h-4 w-4 text-primary" />
                </div>
                )}
                
                <div className={`flex flex-col gap-1 max-w-[85%] md:max-w-[75%] ${m.role === "user" ? "items-end" : "items-start"}`}>
                <div className="flex items-center gap-2 select-none">
                    <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide">
                    {m.role === "ai" ? "IlmAI" : "You"}
                    </span>
                    {m.role === "ai" && m.model && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-accent text-muted-foreground border border-border/50">
                            {m.model}
                        </span>
                    )}
                </div>
                <div
                    className={`text-[15px] leading-relaxed whitespace-pre-wrap shadow-sm ${
                    m.role === "user" 
                        ? "bg-accent text-foreground px-5 py-3.5 rounded-2xl rounded-tr-sm border border-border/50" 
                        : "text-foreground/90 py-2"
                    }`}
                >
                    {m.text}
                </div>
                </div>

                {m.role === "user" && (
                 <div className="h-8 w-8 rounded-full bg-accent border border-border/50 flex items-center justify-center shrink-0 mt-1 shadow-sm select-none">
                    <User className="h-4 w-4 text-muted-foreground" />
                </div>
                )}
            </div>
            ))}
            {isLoading && (
                <div className="flex gap-4 md:gap-6 justify-start">
                    <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-1 shadow-sm select-none">
                        <Bot className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex items-center gap-2">
                         <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="w-2 h-2 bg-primary/40 rounded-full animate-bounce"></div>
                        </div>
                    </div>
                </div>
            )}
        </div>
      </div>

      {/* Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background via-background to-transparent pt-12 z-20">
        <div className="max-w-3xl mx-auto">
          <div className="relative bg-card/80 backdrop-blur-xl border border-border/50 rounded-2xl shadow-lg focus-within:border-primary/50 focus-within:ring-1 focus-within:ring-primary/20 transition-all overflow-hidden">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
              placeholder={`Message IlmAI (${activeMode})...`}
              className="min-h-[52px] max-h-[200px] w-full resize-none border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 px-4 py-3.5 text-foreground placeholder:text-muted-foreground text-base"
              style={{ height: '52px' }}
              disabled={isLoading}
            />
            
            <div className="flex justify-between items-center px-2 pb-2">
              <div className="flex items-center gap-0.5">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover text-popover-foreground border-border text-xs">Attach</TooltipContent>
                  </Tooltip>
                  
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover text-popover-foreground border-border text-xs">Image</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-lg transition-colors">
                        <Globe className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-popover text-popover-foreground border-border text-xs">Search</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>

              <div className="flex items-center gap-2">
                 <Button 
                  onClick={sendMessage}
                  size="icon"
                  className={`h-7 w-7 rounded-lg transition-all shadow-sm ${
                    input.trim() 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "bg-muted text-muted-foreground cursor-not-allowed"
                  }`}
                  disabled={!input.trim() || isLoading}
                >
                  <Send className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
          <p className="text-[10px] text-center text-muted-foreground/70 mt-3 select-none">
            IlmAI can make mistakes. Please verify important Islamic information.
          </p>
        </div>
      </div>
    </main>
  );
}

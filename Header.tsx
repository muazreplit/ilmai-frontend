import { BrainCircuit, LogIn, Menu, GraduationCap, Users, MessageSquare, BookOpen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon } from "lucide-react";

export default function Header() {
  const modes = [
    { name: "Scholar Mode", icon: GraduationCap },
    { name: "Teacher Mode", icon: Users },
    { name: "Brother Mode", icon: MessageSquare },
    { name: "Tafsir Mode", icon: BookOpen },
  ];
  const { theme, setTheme } = useTheme();

  return (
    <header className="md:hidden h-14 bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 flex items-center justify-between px-4 transition-all">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="-ml-2 text-muted-foreground hover:text-foreground hover:bg-accent/50">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 bg-background border-r border-border text-foreground">
            <div className="p-6 border-b border-border/50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                </div>
                <SheetTitle className="text-lg font-bold tracking-tight">IlmAI</SheetTitle>
              </div>
            </div>
            <ScrollArea className="h-[calc(100vh-80px)]">
              <div className="p-4 space-y-6">
                <div className="space-y-1">
                    {modes.map((mode, i) => (
                      <button
                        key={i}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors text-left"
                      >
                        <mode.icon className="h-4 w-4 opacity-70" />
                        {mode.name}
                      </button>
                    ))}
                </div>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>

        <span className="font-semibold text-sm">New Chat</span>
      </div>
      
      <Button 
          variant="ghost" 
          size="icon" 
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="h-9 w-9 text-muted-foreground hover:text-foreground hover:bg-accent/50 rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
      </Button>
    </header>
  );
}

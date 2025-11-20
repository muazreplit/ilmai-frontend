import { 
  BookOpen, 
  GraduationCap, 
  Users, 
  MessageSquare,
  Plus,
  Settings,
  LogOut,
  MoreHorizontal,
  Sparkles,
  History,
  CreditCard,
  Pencil,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";

interface SidebarProps {
  onModeSelect: (mode: string) => void;
}

export default function Sidebar({ onModeSelect }: SidebarProps) {
  const modes = [
    { name: "Scholar Mode", icon: GraduationCap },
    { name: "Teacher Mode", icon: Users },
    { name: "Brother Mode", icon: MessageSquare },
    { name: "Tafsir Mode", icon: BookOpen },
  ];

  const history = [
    "Meaning of Surah Al-Fatiha",
    "Prayer times in London",
    "How to perform Wudu",
    "History of Mecca",
    "Zakat calculation help",
    "Understanding Ramadan",
    "Islamic finance basics"
  ];

  return (
    <aside className="w-[280px] bg-background/95 backdrop-blur-xl flex flex-col h-full hidden md:flex border-r border-border z-20">
      {/* Header / New Chat */}
      <div className="p-4 pb-2">
        <div className="flex items-center gap-2 mb-6 px-2">
            <div className="h-8 w-8 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 shadow-sm">
                <Sparkles className="h-4 w-4 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tight">IlmAI</span>
        </div>
        
        <Button className="w-full justify-start gap-2 bg-foreground text-background hover:bg-foreground/90 font-medium rounded-lg h-10 shadow-sm transition-all" size="sm">
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Navigation / Modes */}
      <div className="px-3 py-2">
        <h3 className="px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Assistant Modes
        </h3>
        <div className="space-y-0.5">
          {modes.map((mode, i) => (
            <button
              key={i}
              onClick={() => onModeSelect(mode.name)}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-md text-[13px] font-medium text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-all text-left"
            >
              <mode.icon className="h-4 w-4 opacity-70" />
              {mode.name}
            </button>
          ))}
        </div>
      </div>

      {/* History */}
      <div className="flex-1 min-h-0 px-3 py-2">
        <h3 className="px-4 text-[11px] font-semibold text-muted-foreground uppercase tracking-wider mb-2">
          Recent
        </h3>
        <ScrollArea className="h-[calc(100%-2rem)]">
          <div className="space-y-0.5">
            {history.map((item, i) => (
              <div
                key={i}
                className="group relative flex items-center rounded-md text-[13px] text-muted-foreground/80 hover:bg-accent/50 hover:text-foreground transition-all"
              >
                <button className="flex-1 flex items-center gap-3 px-4 py-2 text-left truncate">
                    <span className="truncate">{item}</span>
                </button>
                
                <div className="absolute right-2 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-accent/50 backdrop-blur-sm rounded-md p-0.5">
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-foreground hover:bg-background/50 rounded-sm">
                        <Pencil className="h-3 w-3" />
                        <span className="sr-only">Rename</span>
                    </Button>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-red-400 hover:bg-background/50 rounded-sm">
                        <Trash2 className="h-3 w-3" />
                        <span className="sr-only">Delete</span>
                    </Button>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* User Profile - Bottom Left */}
      <div className="p-3 border-t border-border bg-background/50 backdrop-blur-sm">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-accent/50 transition-all text-left group border border-transparent hover:border-border/50">
              <Avatar className="h-8 w-8 rounded-lg border border-border/50 shadow-sm">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback className="bg-accent text-muted-foreground rounded-lg">US</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-[13px] truncate">Abdullah User</div>
                <div className="text-[11px] text-muted-foreground truncate">Free Plan</div>
              </div>
              <MoreHorizontal className="h-4 w-4 text-muted-foreground group-hover:text-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-60 mb-2 p-1 rounded-xl border-border/50 shadow-xl bg-background/95 backdrop-blur-xl">
            <DropdownMenuLabel className="text-xs text-muted-foreground px-2 py-1.5">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg focus:bg-accent cursor-pointer py-2">
              <Sparkles className="h-4 w-4 mr-2 text-primary" />
              Upgrade to Pro
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg focus:bg-accent cursor-pointer py-2">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="rounded-lg focus:bg-accent cursor-pointer py-2">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="rounded-lg focus:bg-accent focus:text-red-500 text-red-500 cursor-pointer py-2">
              <LogOut className="h-4 w-4 mr-2" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </aside>
  );
}

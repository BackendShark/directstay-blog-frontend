import { Search, Bell, Sun, DollarSign, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function TopNav() {
  return (
    <div className="h-24 border-b border-border bg-background py-4 px-6 flex items-center justify-between">
      <div className="px-8 py-6 border-border">
        <h1 className="text-2xl font-semibold text-foreground">
          Media Toolkit
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your media assets in a personalized library.
        </p>
      </div>
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search for post, merchant..."
            className="w-full pl-10 pr-4 py-2 bg-muted rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="relative p-2 hover:bg-muted rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Sun className="w-5 h-5 text-foreground" />
        </button>

        <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg">
          <DollarSign className="w-4 h-4 text-foreground" />
          <span className="text-sm font-medium">78.68</span>
        </div>

        <button className="flex items-center gap-2 hover:bg-muted rounded-lg px-2 py-1.5 transition-colors">
          <Avatar className="w-8 h-8">
            <AvatarImage src="/placeholder.svg?height=32&width=32" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

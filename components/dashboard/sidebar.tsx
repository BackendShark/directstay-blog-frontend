import {
  LayoutGrid,
  FileText,
  PenSquare,
  ImageIcon,
  BarChart3,
  Store,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";

const navigation = [
  { name: "Overview", icon: LayoutGrid, current: false },
  { name: "Content Manager", icon: FileText, current: false },
  { name: "Blog Post Editor", icon: PenSquare, current: true },
  { name: "Media Toolkit", icon: ImageIcon, current: false },
  { name: "Analytics", icon: BarChart3, current: false },
  { name: "Merchants", icon: Store, current: false },
  { name: "Messages", icon: MessageSquare, current: false, badge: 1 },
  { name: "Payments", icon: CreditCard, current: false },
];

export function Sidebar({
  currentPage = "Blog Post Editor",
}: {
  currentPage?: string;
}) {
  return (
    <div className="w-[240px] bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <Image
            src="/assets/logo.svg"
            alt="Logo"
            width={140}
            height={140}
            className=""
          />
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isCurrent = item.name === currentPage;
          return (
            <Link
              key={item.name}
              href={
                item.name === "Blog Post Editor"
                  ? "/dashboard/blog-editor"
                  : item.name === "Media Toolkit"
                  ? "/dashboard/media-toolkit"
                  : "#"
              }
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors relative",
                isCurrent
                  ? "bg-[#5B6FFF] text-white"
                  : "text-sidebar-foreground hover:bg-sidebar-accent"
              )}
            >
              <Icon className="w-5 h-5" />
              <span>{item.name}</span>
              {item.badge && (
                <span className="ml-auto w-5 h-5 flex items-center justify-center rounded-full bg-red-500 text-white text-xs font-bold">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

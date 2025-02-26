import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";
import { Button } from "~/common/components/ui/button";
import {
  CalendarDays,
  CirclePlus,
  CirclePlusIcon,
  Plus,
  User,
  Users,
} from "lucide-react";

export default function BottomNav() {
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      icon: <img src="/images/logoimg.svg" alt="홈" className="h-6 w-6" />,
      label: "홈",
    },
    {
      to: "/schedule",
      icon: <CalendarDays className="h-6 w-6" />,
      label: "일정",
    },
    {
      to: "/add-match",
      icon: (
        <CirclePlus className="size-24 text-primary bg-primary/50 rounded-full shadow-lg p-2 -mt-10" />
      ),
      label: "매치 추가",
    },
    {
      to: "/matchs",
      icon: <Users className="h-6 w-6" />,
      label: "매치현황",
    },
    {
      to: "/my-page",
      icon: <User className="h-6 w-6" />,
      label: "마이페이지",
    },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-t bg-white z-50">
      <ul className="flex h-16 items-center justify-between px-6">
        {navItems.map((item) => {
          const isActive = location.pathname.startsWith(item.to);
          const isAddMatch = item.to === "/add-match";

          return (
            <li key={item.to}>
              <Link
                to={item.to}
                className={cn(
                  "flex flex-col items-center gap-1",
                  isActive && "text-primary",
                  !isActive && "text-muted-foreground",
                  isAddMatch && "-mt-8"
                )}
              >
                {isAddMatch ? (
                  <Plus className="size-12 text-white bg-primary rounded-full p-2 shadow-lg" />
                ) : (
                  item.icon
                )}
                <span className="text-[10px]">{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

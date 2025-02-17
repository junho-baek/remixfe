import { Link } from "react-router";
import { useState } from "react";
import { Separator } from "~/common/components/ui/separator";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import { cn } from "~/lib/utils";
const menus = [
  {
    name: "Products",
    to: "/products",
    items: [
      {
        name: "Leaderboard",
        description: "리더보드",
        to: "/products/leaderboard",
      },
      {
        name: "Categories",
        description: "카테고리별 프로젝트 모음",
        to: "/products/categories",
      },
      {
        name: "Search",
        description: " 프로젝트 검색",
        to: "/products/search",
      },
      {
        name: "Submit",
        description: "프로젝트 제출",
        to: "/products/submit",
      },
      {
        name: "Promote",
        description: "프로젝트 홍보",
        to: "/products/promote",
      },
    ],
  },
  {
    name: "Jobs",
    to: "/jobs",
    items: [
      {
        name: "Remote",
        description: "원격 근무 채용 공고",
        to: "/jobs?location=remote",
      },
      {
        name: "Full-time Jobs",
        description: "정규 직원 채용 공고",
        to: "/jobs?type=full-time",
      },
      {
        name: "Part-time Jobs",
        description: "알바 채용 공고",
        to: "/jobs?type=part-time",
      },
      {
        name: "Internships",
        description: "인턴 채용 공고",
        to: "/jobs?type=internship",
      },
      {
        name: "Submit a Job",
        description: "채용 공고 제출",
        to: "/jobs/submit",
      },
    ],
  },
  {
    name: "Community",
    to: "/community",
    items: [
      {
        name: "All Posts",
        description: "모든 게시글",
        to: "/community",
      },
      {
        name: "Top Posts",
        description: "인기 게시글",
        to: "/community?sort=top",
      },
      {
        name: "New Posts",
        description: "최신 게시글",
        to: "/community?sort=new",
      },
    ],
  },
  {
    name: "Idea GPT",
    to: "/ideas",
  },
  {
    name: "Teams",
    to: "/teams",
    items: [
      {
        name: "All Teams",
        description: "모든 팀",
        to: "/teams",
      },
      {
        name: "Create Team",
        description: "팀 생성",
        to: "/teams/create",
      },
    ],
  },
];
export default function Navigation() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <nav className="flex justify-between items-center px-20 h-16 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center gap-4">
        <Link to="/">Ybigta</Link>
        <Separator orientation="vertical" className="h-6 mx-4" />
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <Link to={menu.to}>
                      <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    </Link>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] grid-cols-2 gap-3 p-6 font-light">
                        {menu.items?.map((item) => (
                          <NavigationMenuItem
                            key={item.name}
                            className={cn(
                              "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                              item.to === "/products/promote" &&
                                "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                              item.to === "/jobs/submit" &&
                                "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20"
                            )}
                          >
                            <NavigationMenuLink asChild>
                              <Link
                                to={item.to}
                                className="p-3 space-y-1 block leading-none no-underline outline-none"
                              >
                                <span className="text-sm font-medium leading-none">
                                  {item.name}
                                </span>
                                <p className="text-sm leading-none text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link to={menu.to} className={navigationMenuTriggerStyle()}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      {isLoggedIn ? null : (
        <div className="flex items-center gap-4">
          <Button asChild>
            <Link to="/auth/login">로그인</Link>
          </Button>
          <Button asChild>
            <Link to="/auth/signup">회원가입</Link>
          </Button>
        </div>
      )}
    </nav>
  );
}

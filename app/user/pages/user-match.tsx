import { Outlet, Link, useLocation } from "react-router";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "~/common/components/ui/avatar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "~/common/components/ui/tabs";

// export function loader() { ... } // 주석 처리

export default function UserMatchPage() {
  const location = useLocation();
  const currentTab = location.pathname.endsWith("results")
    ? "results"
    : "timetable";

  const user = {
    name: "홍길동",
    email: "hong@example.com",
    avatar: "/images/avatar.png",
    level: "중급",
    position: "가드",
    matchCount: 15,
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>프로필 정보</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-6">
          <Avatar className="h-24 w-24 z-12">
            <AvatarImage
              className="w-24 h-24"
              src={user.avatar}
              alt={user.name}
            />
            <AvatarFallback>{user.name[0]}</AvatarFallback>
          </Avatar>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
            <div className="flex flex-col gap-2">
              <span className="text-sm">레벨: {user.level}</span>
              <span className="text-sm">포지션: {user.position}</span>
              <span className="text-sm">참여 매치: {user.matchCount}회</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={currentTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="timetable" asChild>
            <Link to="timetable">매치 타임테이블</Link>
          </TabsTrigger>
          <TabsTrigger value="results" asChild>
            <Link to="results">매치 현황</Link>
          </TabsTrigger>
        </TabsList>
        <div className="mt-6">
          <Outlet />
        </div>
      </Tabs>
    </div>
  );
}

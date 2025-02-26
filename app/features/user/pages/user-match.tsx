import { Outlet, Link, useLocation } from "react-router";

import { Tabs, TabsList, TabsTrigger } from "~/common/components/ui/tabs";
import { UserCard } from "~/features/user/components/user-card";

// export function loader() { ... } // 주석 처리

export default function UserMatchPage() {
  const location = useLocation();
  const currentTab = location.pathname.endsWith("results")
    ? "results"
    : "timetable";

  const user = {
    name: "백준호",
    email: "junho@example.com",
    avatar: "/images/avatar.png",
    level: "중급",
    position: "가드",
    matchCount: 15,
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <UserCard
        userName={user.name}
        userEmail={user.email}
        userAvatar={user.avatar}
        userLevel={user.level}
        userPosition={user.position}
        userMatchCount={user.matchCount}
      />
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

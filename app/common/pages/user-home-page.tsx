import { Button } from "~/common/components/ui/button";
import { Card } from "~/common/components/ui/card";
import { UserCard } from "~/features/user/components/user-card";
import { MapPin } from "lucide-react";

const matchList = [
  {
    id: 1,
    date: "3/7(금)",
    time: "11:00 - 13:00",
    place: "마포 해피 농구장",
    location: "서울시 마포구",
    level: "Lv.3",
    players: "5:5",
    gender: "남성",
    status: "마감 임박",
    image: "/images/court1.jpg",
    color: "red",
  },
  {
    id: 2,
    date: "3/7(금)",
    time: "12:00 - 14:00",
    place: "마포 구민 농구장",
    location: "서울시 마포구",
    level: "Lv.1",
    players: "5:5",
    gender: "남성",
    status: "모집중",
    image: "/images/court2.jpg",
    color: "blue",
  },
  // ... 더 많은 매치 데이터
];

export default function HomePage() {
  return (
    <div className="flex flex-col gap-4 p-4 mt-10">
      <UserCard
        userName="백준호"
        userEmail="junho@example.com"
        userAvatar="/images/avatar.png"
        userLevel="중급"
        userPosition="가드"
        userMatchCount={10}
      />

      <div className="bg-white rounded-xl p-4">
        <div className="flex items-center gap-2 mb-4">
          <img
            src="/images/logoimg.svg"
            alt="RtP"
            className="size-4 invert dark:invert-0"
          />
          <span className="font-medium">
            R2P 매치란? R2P 이용방법 전부 알아보기!
          </span>
          <span className="ml-auto">›</span>
        </div>

        <div className="flex gap-2 mb-4 overflow-x-auto scrollbar-hide">
          {[19, 20, 21, 22, 23, 24].map((day, index) => (
            <Button
              key={day}
              variant={index === 0 ? "default" : "outline"}
              className="rounded-full min-w-[4rem]"
            >
              {day}
              <span className="text-xs ml-1">
                {["일", "월", "화", "수", "목", "금"][index]}
              </span>
            </Button>
          ))}
        </div>

        <div className="flex gap-2 mb-4">
          <Button variant="default" className="rounded-full">
            시간순
          </Button>
          <Button variant="outline" className="rounded-full">
            마감임박
          </Button>
          <Button variant="outline" className="rounded-full">
            레벨 ›
          </Button>
          <Button variant="outline" className="rounded-full">
            시간대 ›
          </Button>
        </div>

        <div className="space-y-4">
          {matchList.map((match) => (
            <div
              key={match.id}
              className="relative border rounded-lg overflow-hidden"
            >
              <div
                className={`absolute left-0 top-0 bottom-0 w-1 bg-${match.color}-500`}
              />
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium">
                      {match.date} {match.time}
                    </h3>
                    <h4 className="font-medium">{match.place}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {match.location}
                    </div>
                  </div>
                  <img
                    src={match.image}
                    alt={match.place}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                </div>
                <div className="flex gap-2">
                  <span className="px-2 py-1 rounded-full bg-secondary text-sm">
                    {match.gender}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-secondary text-sm">
                    {match.level}
                  </span>
                  <span className="px-2 py-1 rounded-full bg-secondary text-sm">
                    {match.players}
                  </span>
                </div>
                <Button
                  variant={match.status === "모집중" ? "default" : "outline"}
                  className="w-full mt-3"
                >
                  {match.status}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

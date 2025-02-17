import type { Route } from "../../+types/root";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";

interface Match {
  id: number;
  location: string;
  date: string;
  time: string;
  currentPlayers: number;
  maxPlayers: number;
  level: string;
  status: "OPEN" | "FULL" | "CLOSED";
  participants: {
    position: string;
    isConfirmed: boolean;
  }[];
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "매치 목록" },
    { name: "description", content: "참여 가능한 매치 목록" },
  ];
};

export default function MatchResultPage() {
  const matches: Match[] = [
    {
      id: 1,
      location: "명지대학교 체육관 1층 농구장",
      date: "2024년 3월 15일",
      time: "18:00 - 20:00",
      currentPlayers: 8,
      maxPlayers: 12,
      level: "중급",
      status: "OPEN",
      participants: [
        { position: "가드", isConfirmed: true },
        { position: "포워드", isConfirmed: true },
        { position: "센터", isConfirmed: false },
      ],
    },
    {
      id: 2,
      location: "명지대학교 체육관 2층 농구장",
      date: "2024년 3월 16일",
      time: "19:00 - 21:00",
      currentPlayers: 12,
      maxPlayers: 12,
      level: "고급",
      status: "FULL",
      participants: [
        { position: "가드", isConfirmed: true },
        { position: "포워드", isConfirmed: true },
        { position: "센터", isConfirmed: true },
      ],
    },
  ];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">매치 목록</h1>
      <div className="grid gap-6">
        {matches.map((match) => (
          <Card key={match.id}>
            <CardHeader>
              <Badge
                className="flex w-24 text-center leading-none"
                variant={
                  match.status === "OPEN"
                    ? "default"
                    : match.status === "FULL"
                    ? "secondary"
                    : "destructive"
                }
              >
                {match.status === "OPEN"
                  ? "모집중"
                  : match.status === "FULL"
                  ? "모집완료"
                  : "마감"}
              </Badge>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle className="text-xl">{match.location}</CardTitle>
                  <CardDescription>
                    {match.date} {match.time}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center justify-between w-full">
                <div className="flex items-center gap-6 mb-4">
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      {match.currentPlayers}/{match.maxPlayers}명
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-muted-foreground"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                      />
                    </svg>
                    <span className="text-sm font-medium">
                      레벨: {match.level}
                    </span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    disabled={match.status !== "OPEN"}
                    className="w-24 h-9"
                  >
                    불참하기
                  </Button>
                  <Button
                    variant="default"
                    disabled={match.status !== "OPEN"}
                    className="w-24 h-9"
                  >
                    참여하기
                  </Button>
                </div>
              </div>
              <div className="pt-4 border-t">
                <p className="text-sm font-medium mb-2">참가자 현황</p>
                <div className="flex gap-2 flex-wrap">
                  {match.participants.map((participant, index) => (
                    <Badge
                      key={index}
                      variant={participant.isConfirmed ? "default" : "outline"}
                    >
                      {participant.position}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

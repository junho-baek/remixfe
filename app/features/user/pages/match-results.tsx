import type { Route } from "../../../+types/root";
import { MatchCard } from "~/features/match/components/match-card";

interface Match {
  matchId: number;
  matchLocation: string;
  matchDate: string;
  matchTime: string;
  matchCurrentPlayers: number;
  matchMaxPlayers: number;
  matchLevel: string;
  matchStatus: "OPEN" | "FULL" | "CLOSED";
  matchParticipants: {
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

export default function MatchResults() {
  const matches: Match[] = [
    {
      matchId: 1,
      matchLocation: "명지대학교 체육관 1층 농구장",
      matchDate: "2024년 3월 15일",
      matchTime: "18:00 - 20:00",
      matchCurrentPlayers: 8,
      matchMaxPlayers: 12,
      matchLevel: "중급",
      matchStatus: "OPEN",
      matchParticipants: [
        { position: "가드", isConfirmed: true },
        { position: "포워드", isConfirmed: false },
        { position: "센터", isConfirmed: false },
        { position: "스몰포워드", isConfirmed: true },
      ],
    },
    {
      matchId: 2,
      matchLocation: "명지대학교 체육관 2층 농구장",
      matchDate: "2024년 3월 16일",
      matchTime: "19:00 - 21:00",
      matchCurrentPlayers: 12,
      matchMaxPlayers: 12,
      matchLevel: "고급",
      matchStatus: "FULL",
      matchParticipants: [
        { position: "가드", isConfirmed: true },
        { position: "포워드", isConfirmed: true },
        { position: "센터", isConfirmed: true },
      ],
    },
  ];

  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <MatchCard
          key={match.matchId}
          matchId={match.matchId}
          matchStatus={match.matchStatus}
          matchLocation={match.matchLocation}
          matchDate={match.matchDate}
          matchTime={match.matchTime}
          matchCurrentPlayers={match.matchCurrentPlayers}
          matchMaxPlayers={match.matchMaxPlayers}
          matchLevel={match.matchLevel}
          matchParticipants={match.matchParticipants}
        />
      ))}
    </div>
  );
}

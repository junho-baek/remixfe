import { Trophy, UserRound } from "lucide-react";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "~/common/components/ui/card";

interface Participant {
  position: string;
  isConfirmed: boolean;
}

interface MatchCardProps {
  matchId: number;
  matchStatus: "OPEN" | "FULL" | "CLOSED";
  matchLocation: string;
  matchDate: string;
  matchTime: string;
  matchCurrentPlayers: number;
  matchMaxPlayers: number;
  matchLevel: string;
  matchParticipants: Participant[];
  onJoin?: () => void;
  onCancel?: () => void;
}

export function MatchCard({
  matchId,
  matchStatus,
  matchLocation,
  matchDate,
  matchTime,
  matchCurrentPlayers,
  matchMaxPlayers,
  matchLevel,
  matchParticipants,
  onJoin,
  onCancel,
}: MatchCardProps) {
  const statusVariant = {
    OPEN: "default",
    FULL: "secondary",
    CLOSED: "destructive",
  };

  const statusLabel = {
    OPEN: "모집중",
    FULL: "모집완료",
    CLOSED: "마감",
  };

  return (
    <Card>
      <CardHeader>
        <Badge
          className="flex w-24 text-center leading-none"
          variant={
            statusVariant[matchStatus] as
              | "default"
              | "secondary"
              | "destructive"
          }
        >
          {statusLabel[matchStatus]}
        </Badge>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-xl">{matchLocation}</CardTitle>
            <CardDescription>
              {matchDate} {matchTime}
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 ">
        <div className="flex flex-col justify-end w-full">
          <div className="flex items-center gap-6 mb-4">
            <div className="flex items-center gap-2">
              <UserRound className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">
                {matchCurrentPlayers}/{matchMaxPlayers}명
              </span>
            </div>
            <div className="flex justify-end gap-2">
              <Trophy className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium">레벨: {matchLevel}</span>
            </div>
          </div>
          <div className="flex gap-3 justify-end">
            <Button
              variant="outline"
              disabled={matchStatus !== "OPEN"}
              className="w-24 h-9"
              onClick={onCancel}
            >
              거절하기
            </Button>
            <Button
              variant="default"
              disabled={matchStatus !== "OPEN"}
              className="w-24 h-9"
              onClick={onJoin}
            >
              참여하기
            </Button>
          </div>
        </div>
        <div className="pt-4 border-t">
          <p className="text-sm font-medium mb-2">참가자 현황</p>
          <div className="flex gap-2 flex-wrap">
            {matchParticipants.map((participant, index) => (
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
  );
}

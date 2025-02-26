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

interface UserCardProps {
  userName: string;
  userEmail: string;
  userAvatar: string;
  userLevel: string;
  userPosition: string;
  userMatchCount: number;
}

export function UserCard({
  userName,
  userEmail,
  userAvatar,
  userLevel,
  userPosition,
  userMatchCount,
}: UserCardProps) {
  return (
    <Card>
      <CardContent className="flex items-center gap-6 p-4">
        <Avatar className="h-24 w-24 z-12">
          <AvatarImage className="w-24 h-24" src={userAvatar} alt={userName} />
          <AvatarFallback>{userName[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">{userName}</h2>
          <p className="text-muted-foreground">{userEmail}</p>
          <div className="flex flex-col gap-2">
            <span className="text-sm">레벨: {userLevel}</span>
            <span className="text-sm">포지션: {userPosition}</span>
            <span className="text-sm">참여 매치: {userMatchCount}회</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

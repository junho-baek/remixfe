// import { useState } from "react";
import { useNavigate } from "react-router";
import type { Route } from "../../+types/root";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/common/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/common/components/ui/card";

export function loader() {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "회원가입 - Ready to Play" },
    { name: "description", content: "Ready to Play 회원가입 페이지입니다." },
  ];
};

interface SignupRequest {
  email: string;
  password: string;
  nickname: string;
  gender: "MALE" | "FEMALE";
  age: number;
  sportType: "BASKETBALL";
}

export default function SignupPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/survey");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center text-primary">
            회원가입
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input type="email" placeholder="이메일" />
            <Input type="password" placeholder="비밀번호" />
            <Input type="text" placeholder="닉네임" />
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="성별을 선택하세요" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">남성</SelectItem>
                <SelectItem value="FEMALE">여성</SelectItem>
              </SelectContent>
            </Select>
            <Input type="number" placeholder="나이" />
            <Button type="submit" className="w-full">
              가입하기
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

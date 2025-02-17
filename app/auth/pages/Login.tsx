import { useState } from "react";
import { useNavigate, Link } from "react-router";
import type { Route } from "../../+types/root";
import { Button } from "~/common/components/ui/button";
import { Input } from "~/common/components/ui/input";
import { Separator } from "~/common/components/ui/separator";

export function loader() {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "로그인 - Ready to Play" },
    { name: "description", content: "Ready to Play 로그인 페이지입니다." },
  ];
};

interface LoginRequest {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginRequest>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // await fetchLogin(formData);
      navigate("/home");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold text-primary">Ready to Play</h1>
          <p className="text-lg text-muted-foreground">
            스포츠를 더 가깝게, Ready to Play
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="email"
            placeholder="이메일을 입력해주세요"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <Input
            type="password"
            placeholder="비밀번호를 입력해주세요"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
          <Button type="submit" className="w-full">
            로그인
          </Button>
        </form>

        <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
          <Link to="/find-id">아이디 찾기</Link>
          <Separator orientation="vertical" className="h-4" />
          <Link to="/find-password">비밀번호 찾기</Link>
          <Separator orientation="vertical" className="h-4" />
          <Link to="/signup">회원가입</Link>
        </div>

        <div className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            간편 로그인
          </p>
          <div className="flex justify-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full">
              <img src="/images/google.png" alt="Google" className="w-6 h-6" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <img
                src="/images/facebook.png"
                alt="Facebook"
                className="w-6 h-6"
              />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full">
              <img src="/images/apple.png" alt="Apple" className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

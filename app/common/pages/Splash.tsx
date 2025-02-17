import { useEffect } from "react";
import { useNavigate } from "react-router";
import type { Route } from "../../+types/root";

export function loader() {
  return {};
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Ready to Play" },
    { name: "description", content: "Welcome to Ready to Play" },
  ];
};

export default function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="flex items-center gap-2">
        <img src="/images/logoimg.svg" alt="Logo" className="h-16" />
        <img src="/images/RtP.svg" alt="Ready to Play" className="h-16" />
      </div>
    </div>
  );
}

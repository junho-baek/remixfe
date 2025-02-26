import { Link } from "react-router";

export default function AppBar() {
  return (
    <header className="fixed top-0 left-0 right-0 h-14 flex items-center px-4 bg-background/70  z-10 backdrop-blur">
      <Link to="/" className="flex items-center gap-1">
        <img src="/images/logoimg.svg" alt="Logo" className="h-5 w-auto" />
        <img src="/images/RtP.svg" alt="Ready to Play" className="h-5 w-auto" />
      </Link>
    </header>
  );
}

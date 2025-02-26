import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLocation,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import stylesheet from "~/tailwind.css?url";

import AppBar from "./common/components/AppBar";
import BottomNav from "./common/components/BottomNav";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: stylesheet },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

const ROUTES_WITHOUT_NAVIGATION = [
  "/login",
  "/signup",
  "/survey",
  "/find-id",
  "/find-password",
];
export default function App() {
  const location = useLocation();
  const hideNavigation = ROUTES_WITHOUT_NAVIGATION.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      <AppBar />
      <main className="flex-1">
        <Outlet />
      </main>
      {!hideNavigation && <BottomNav />}
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto h-screen w-screen rounded-lg flex flex-col items-center justify-center ">
      <div className="flex w-1/2 h-1/2 flex-col items-center justify-center  bg-gradient-to-r from-red-300 to-red-500 animate-pulse hover:bg-gradient-to-r transition-none duration-500 ease-in-out hover:from-red-500 hover:to-red-300 rounded-xl shadow-xl">
        <h1 className="text-4xl font-bold">
          오류가 발생했습니다: <span className="text-red-500">{message}</span>
        </h1>
        <p className="text-lg italic mt-4">{details}</p>
        {stack && (
          <pre className="w-full p-4 overflow-x-auto">
            <code>{stack}</code>
          </pre>
        )}
      </div>
    </main>
  );
}

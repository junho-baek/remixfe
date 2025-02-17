import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("common/pages/Splash.tsx"),
  // route("/home", "common/pages/home-page.tsx"),
  // route("/time-table", "common/pages/time-table.tsx"),
  route("/login", "auth/pages/login.tsx"),
  route("/signup", "auth/pages/signup.tsx"),
  route("/survey", "auth/pages/survey.tsx"),
  // route("results2", "user/pages/match-results.tsx"),
  route("home", "user/pages/user-match.tsx", [
    route("timetable", "user/pages/match-timetable.tsx"),
    route("results", "user/pages/match-results.tsx"),
  ]),
] satisfies RouteConfig;

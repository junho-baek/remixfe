import {
  type RouteConfig,
  index,
  prefix,
  route,
} from "@react-router/dev/routes";

export default [
  index("common/pages/user-home-page.tsx"),
  // ...prefix("/manager", [index("common/pages/manager-home-page.tsx")]),
  ...prefix("/auth", [
    route("/login", "features/auth/pages/login.tsx"),
    route("/signup", "features/auth/pages/signup.tsx"),
    route("/survey", "features/auth/pages/survey.tsx"),
  ]),
  route("/home", "features/user/pages/user-match.tsx", [
    route("timetable", "features/user/pages/match-timetable.tsx"),
    route("results", "features/user/pages/match-results.tsx"),
  ]),
] satisfies RouteConfig;

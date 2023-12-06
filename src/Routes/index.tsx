import Home from "../pages/Home";

export const routes: { path: string; component: React.ReactElement; name: string }[] = [
  {
    path: "/",
    component: <Home />,
    name: "Home",
  },
];

import Home from "../pages/Home";
import ContactDetails from "../pages/Contact/ContactDetails";
import ContactList from "../pages/Contact/ContactList";

type routeProps = {
  path: string;
  component: React.ReactElement;
  name: string;
  showOnSideBar?: boolean;
  index?: boolean;
  children?: {
    path: string;
    component: React.ReactElement;
    index?: boolean;
  }[];
}[];

export const routes: routeProps = [
  {
    path: "/",
    component: <Home />,
    name: "Home",
    showOnSideBar: true,
    index: true,
  },
  {
    path: "/contact",
    component: <ContactList />,
    name: "Contact",
    showOnSideBar: true,
    children: [
      {
        path: ":id",
        component: <ContactDetails />,
      },
    ],
  },
];

import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PageLayout from "./components/Layout";
import { routes } from "./Routes";
import { ContactContext } from "./config/context/ContactContextProvider";

function App() {
  const contactContext = useContext(ContactContext);
  return (
    <Routes>
      <Route path="/" element={<PageLayout routes={routes} />}>
        {routes.map((routeItem) => {
          if (routeItem.hideParentsInMobile && contactContext?.isMobile) {
            return (
              <Route path={routeItem.path}>
                <Route index element={routeItem.component} />
                {routeItem.children?.map((item) => {
                  return <Route path={item.path} element={item.component} />;
                })}
              </Route>
            );
          }
          return (
            <Route path={routeItem.path} element={routeItem.component}>
              {routeItem.children &&
                routeItem.children.map((route) => {
                  return <Route path={route.path} element={route.component} />;
                })}
            </Route>
          );
        })}
      </Route>
    </Routes>
  );
}

export default App;

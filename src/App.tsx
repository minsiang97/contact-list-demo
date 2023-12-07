import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PageLayout from "./components/Layout";
import { routes } from "./Routes";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout routes={routes} />}>
        {routes.map((routeItem) => (
          <Route path={routeItem.path} element={routeItem.component}>
            {routeItem.children &&
              routeItem.children.map((route) => {
                return <Route path={route.path} element={route.component} />;
              })}
          </Route>
        ))}
      </Route>
    </Routes>
  );
}

export default App;

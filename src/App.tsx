import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import PageLayout from "./components/Layout";
import { routes } from "./Routes";
import Home from "./pages/Home";

function App() {
  return (
    <PageLayout routes={routes}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </PageLayout>
  );
}

export default App;

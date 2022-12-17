import React from "react";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

import "animate.css";
import "./style/base.scss";
import "./style/App.scss";
import "antd/dist/antd.css";

import { routes } from "@/routes";

const BaseRouter = () => {
  const elements = useRoutes(routes);
  return elements;
};

const App = () => {
  return (
    <Router>
      <BaseRouter></BaseRouter>
    </Router>
  );
};

export default App;

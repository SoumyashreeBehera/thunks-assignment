import React from "react";
import { Route, Switch } from "react-router-dom";
import NavBar from "../Components/Navber";
import Completed from "./Completed/Completed";
import { EditPage } from "./EditPage/EditPage";
import Home from "./Home/Home";

export default function Routes() {
  return (
    <>
      <NavBar />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/completed">
          <Completed />
        </Route>
        <Route path="/more">
          <h3 style={{ textAlign: "center" }}>More</h3>
        </Route>
        <Route path="/todo/:id">
          <EditPage />
        </Route>
      </Switch>
    </>
  );
}

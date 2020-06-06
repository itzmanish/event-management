import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/home";
import Auth from "./components/auth";
import AddEvent from "./components/addEvent";
import UserProvider from "./contexts/UserProvider";

function App() {
  return (
    <UserProvider>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/auth" component={Auth} />
          <Route exact path="/add" component={AddEvent} />
        </Switch>
      </Router>
    </UserProvider>
  );
}

export default App;

import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import FormPage from "./views/FormPage";
import Loading from "./components/Loading";
import Home from "./views/Home";
import history from "./utils/history";
import StartLocation from "./views/StartLocation";
import UpdateView from "./views/UpdateView";
import Login from "./views/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {

  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/auth/create" exact component={FormPage}/>
          <ProtectedRoute path="/home" component={StartLocation} />
          <Route path="/auth/login" exact component={Login}/>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

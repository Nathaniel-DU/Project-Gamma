import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Container } from "reactstrap";
import FormPage from "./views/FormPage";
import Loading from "./components/Loading";
import Home from "./views/Home";
import history from "./utils/history";
import StartLocation from "./views/StartLocation";
import UpdateView from "./views/UpdateView";
import Login from "./views/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AcceptedFriendRequest from "./views/AcceptedFriendRequest";
import EditProfile from "./views/EditProfile";
import isAuthenticated from "./utils/isAuthenticated";

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
          <Route exact path="/">
            {isAuthenticated ? <Redirect to="/home" /> : <Home/>}
          </Route>
          <Route exact path="/auth/create">
            {isAuthenticated ? <Redirect to="/home"/> : <FormPage/>}
          </Route>
          <ProtectedRoute path="/home" component={StartLocation} />
          <Route path="/auth/login" exact component={Login}/>
          <Route path="/user/:userid/friends/accept/:friendid" component={AcceptedFriendRequest}/>
          <ProtectedRoute path="/edit" exact component ={EditProfile} />
          <Route path="*"><Redirect to="/"/></Route>
        </Switch>
      </div>
    </Router>
  );
};

export default App;

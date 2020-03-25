import React from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import FormPage from "./views/FormPage";
import Home from "./views/Home";
import history from "./utils/history";
import StartLocation from "./views/StartLocation";
import Login from "./views/LoginPage";
import ProtectedRoute from "./components/ProtectedRoute";
import AcceptedFriendRequest from "./views/AcceptedFriendRequest";
import EditProfile from "./views/EditProfile";
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import ResetPassword from './views/ResetPassword';
import RequestReset from './views/RequestReset';
import "./App.css";
import initFontAwesome from "./utils/initFontAwesome";
 
initFontAwesome();

const App = () => {
    return (
        <Router history={history}>
            <div id="app" className="d-flex flex-column h-100">
                <Switch>
                    <UnauthenticatedRoute exact path="/" component={Home}/>
                    <UnauthenticatedRoute exact path="/auth/create" component={FormPage}/>
                    <ProtectedRoute path="/home" component={StartLocation} />
                    <UnauthenticatedRoute path="/auth/login" exact component={Login}/>
                    <Route path="/user/:userid/friends/accept/:friendid" component={AcceptedFriendRequest}/>
                    <UnauthenticatedRoute path="/auth/reset/:resetid" component={ResetPassword}/>
                    <UnauthenticatedRoute path="/auth/password-reset" component={RequestReset}/>
                    <ProtectedRoute path="/edit" exact component ={EditProfile} />
                    <Route path="*"><Redirect to="/"/></Route>
                </Switch>
            </div>
        </Router>
    );
};

export default App;

import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory,
  Redirect
} from "react-router-dom";

function AppRouter() {
  return (
      <Router>
        <Switch>
          <Route path="/admin" render={()=>{
            return localStorage.getItem("accessToken") ? <Admin/> : <Redirect to="/"/>
          }}>
          </Route>
          <Route path="/">
            <Login/>
          </Route>
        </Switch>
      </Router>
  );
}

function Admin (){
  let history = useHistory()
  let logout = () => {
    localStorage.removeItem("accessToken")
    history.replace("/")
  }
  return <div>
    <h2>Admin</h2>
    <button onClick={logout}>logout</button>
  </div>
}

function Login (){
  let history = useHistory()
  let login = () => {
    localStorage.setItem("accessToken",true)
    history.replace("/admin")
  }
  return <div>
    <h2>login</h2>
    <button onClick={login}>login</button>
  </div>
}

export default AppRouter;
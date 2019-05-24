import React from 'react';
import ReactDOM from 'react-dom';
import FrontPage from "./layouts/FrontPage.jsx";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import 'bootstrap/dist/css/bootstrap.css';

// ReactDOM.render(<Index />, document.getElementById('root'));

ReactDOM.render(
    <BrowserRouter>
    <Switch>
      <Route path="/index" render={props => <FrontPage {...props} />} />

      <Redirect from="/" to="/index" />
    </Switch>
  </BrowserRouter>,
  document.getElementById("root")
);



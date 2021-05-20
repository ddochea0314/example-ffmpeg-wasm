import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import { Example1, Example2, Example3, Example4 } from "./views/Index";

function App() {
  return (
    <BrowserRouter>
      <ul>
        <li>
          <Link to="/">Example 1 (AviToMp4)</Link>
        </li>
        <li>
          <Link to="/Example2">Example 2 (Mp3CoverImport)</Link>
        </li>
        <li>
          <Link to="/Example3">Example 3 (Mp3CoverExport)</Link>
        </li>
        <li>
          <Link to="/Example4">Example 4 (LoadAndExit)</Link>
        </li>
      </ul>
      <br />
      <Switch>
        <Route path="/Example4">
          <Example4 />
        </Route>
        <Route path="/Example3">
          <Example3 />
        </Route>
        <Route path="/Example2">
          <Example2 />
        </Route>
        <Route path="/">
          <Example1 />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;

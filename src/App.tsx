import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import { AviToMp4, Mp3CoverImport } from "./views/Index";

function App() {
  return (
  <BrowserRouter>
  <ul>
    <li><Link to="/">Example 1 (AviToMp4)</Link></li>
    <li><Link to="/Mp3CoverImport">Example 2 (Mp3CoverImport)</Link></li>
  </ul>
  <br />
  <Switch>
    <Route path="/Mp3CoverImport">
    <Mp3CoverImport />
    </Route>
    <Route path="/">
      <AviToMp4 />
    </Route>
  </Switch>
  </BrowserRouter>
  );
}

export default App;

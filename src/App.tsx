import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import "./App.css";

import AviToMp4 from "./views/AviToMp4";

function App() {
  return (
  <BrowserRouter>
  <Link to="/">Example 1 (AviToMp4)</Link>
  <br />
  <Switch>
    <Route path="/">
      <AviToMp4 />
    </Route>
  </Switch>
  </BrowserRouter>
  );
}

export default App;

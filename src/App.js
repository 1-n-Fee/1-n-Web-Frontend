import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./component/style/GlobalStyles";
import Router from "./routes/Router";

function App() {
  return (
    <div className="App">
      <GlobalStyles />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;

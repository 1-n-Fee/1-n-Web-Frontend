import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./component/style/GlobalStyles";
import Router from "./routes/Router";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;

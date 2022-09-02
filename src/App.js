import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./component/style/GlobalStyles";
import Router from "./routes/Router";
import { useRecoilValue } from "recoil";
import LoginDataAtom from "./recoil/isLogin/atom";
import ROLE from "./constants/role";
import ManagerRouter from "./routes/ManagerRouter";

function App() {
  const loginData = useRecoilValue(LoginDataAtom);
  return (
    <div className="App">
      <GlobalStyles />
      <BrowserRouter>
        {loginData.isLogin && loginData.role === ROLE.MANAGER ? (
          <ManagerRouter />
        ) : (
          <Router />
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;

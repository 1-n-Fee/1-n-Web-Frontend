import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./component/style/GlobalStyles";
import Router from "./routes/Router";
import { useRecoilValue } from "recoil";
import ROLE from "./constants/role";
import ManagerRouter from "./routes/ManagerRouter";
import loginAndRoleDataAtom from "./recoil/loginAndRole/atom";

function App() {
  const loginData = useRecoilValue(loginAndRoleDataAtom);
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

import { BrowserRouter } from "react-router-dom";
import GlobalStyles from "./component/style/GlobalStyles";
import Router from "./routes/Router";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ROLE from "./constants/role";
import ManagerRouter from "./routes/ManagerRouter";
import loginAndRoleDataAtom from "./recoil/loginAndRole/atom";
import isMenuOpenAtom from "./recoil/menu/atom";
import styled from "styled-components";

function App() {
  const loginData = useRecoilValue(loginAndRoleDataAtom);
  const setIsMenuOpen = useSetRecoilState(isMenuOpenAtom);
  const onClick = (e) => {
    setIsMenuOpen((cur) => ({ ...cur, myPage: false }));
  };
  return (
    <AppWrapper className="App" onClick={onClick}>
      <GlobalStyles />
      <BrowserRouter>
        {loginData.isLogin && loginData.role === ROLE.MANAGER ? (
          <ManagerRouter />
        ) : (
          <Router />
        )}
      </BrowserRouter>
    </AppWrapper>
  );
}

export default App;

const AppWrapper = styled.div`
  min-height: 100vh;
`;

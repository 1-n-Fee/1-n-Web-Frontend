import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}
ul{
    list-style:none;
    padding: 0;
    margin:0;
}
li{
    list-style:none;
    padding: 0;
    margin:0;
}
`;

export default GlobalStyle;

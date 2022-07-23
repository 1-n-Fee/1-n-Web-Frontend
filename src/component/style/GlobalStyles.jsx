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
button{
    outline:none;
    border:none;
    border-radius: 3.5px;
    &:hover{
        cursor:pointer;
        background-color: #a4b0be;
    }
    
}
`;

export default GlobalStyle;

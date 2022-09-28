import { createGlobalStyle } from "styled-components";
import { COLOR } from "./../../constants/colors";

const GlobalStyles = createGlobalStyle`
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

    &:disabled{
        background-color: ${COLOR.DISABLE_BTN_BG};
        color: ${COLOR.DISABLE_BTN_COLOR};
    }
    
}
input {
    outline:none;
    padding: 0;
    margin:0;
    &:focus{
        outline:none;
    }
}
h2{
    margin:0;
    padding:0;
}
h4{
    margin:0;
    padding:0;
}
`;

export default GlobalStyles;

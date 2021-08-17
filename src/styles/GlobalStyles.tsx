import {createGlobalStyle} from "styled-components";
import reset from "styled-reset"

export const GlobalStyles = createGlobalStyle`
  ${reset}
  ul, li {
    list-style-type: none;
  }
`


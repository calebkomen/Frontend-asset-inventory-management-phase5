import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: 'Arial', sans-serif;
    background-color: #f4f4f4;
    color: #333;
    padding: 0;
    margin: 0;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle;

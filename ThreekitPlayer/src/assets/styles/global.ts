import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  .error > {
    p {
      font-size: 20px;
      color: #fefefe;
      margin: 10vh 10vw;
      margin-bottom: 0;
      text-align: left;
    }
  }

  code {
    color: #bdbdbd;
    text-align: left;
    display: block;
    font-size: 16px;
    margin: 25px 0;

    span {
      color: #f0c674;
    }

    i {
      color: #b5bd68;
    }

    em {
      color: #b294bb;
      font-style: unset;
    }

    b {
      color: #81a2be;
      font-weight: 500;
    }
  }
`;

export default GlobalStyle;

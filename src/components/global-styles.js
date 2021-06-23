import { createGlobalStyle } from "styled-components"

const styled = { createGlobalStyle }

const GlobalStyles = styled.createGlobalStyle`
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto",
      "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans",
      "Helvetica Neue", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  rect.overlay {
    opacity: 0;
  }

  rect.selection {
    fill: #fe9922;
    opacity: 0.5;
  }

  rect.handle {
    fill: #fe9922;
    opacity: 0.25;
  }

  path.countries {
    stroke-width: 1;
    stroke: #75739f;
    fill: #5eafc6;
  }
`

export default GlobalStyles

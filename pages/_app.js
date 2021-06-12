import styled, {createGlobalStyle} from "styled-components"


const GlobalStyle = createGlobalStyle`
body{
  font-family: Geneva, Arial, Helvetica, sans-serif;
  margin: 0px;
  
}
`;



export default function App({ Component, pageProps }) {
  return (<>
  <GlobalStyle/>
  <Component {...pageProps} /></>)
}

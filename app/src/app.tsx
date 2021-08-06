import * as React from 'react';
import NewsFeed from './components/NewsFeed';
import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  body {
    font-family: Verdana, Geneva, Tahoma, sans-serifs;
  }
`

const Main = () => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <NewsFeed title="ORF"></NewsFeed>
    </React.Fragment>
  );
}

export default Main
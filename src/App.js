import styled, { createGlobalStyle } from 'styled-components';
import logo from './logo.svg';
import AudioPlayer from './components/AudioPlayer'
import Tracklist from './components/Tracklist'
import NavMenu from './components/NavMenu'
import Sidebar from './components/Sidebar'


const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: "StratosSkyeng";
    src: local("StratosSkyeng"), local("StratosSkyeng"),
      url("../public/fonts/StratosSkyeng.woff2") format("woff2"),
      url("../public/fonts/StratosSkyeng.woff") format("woff");
    font-weight: 400;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }

  html,
  body {
    width: 100%;
    height: 100%;
    font-family: "StratosSkyeng", sans-serif;
    color: #ffffff;
  }

  a,
  a:visited {
    text-decoration: none;
    font-family: "StratosSkyeng", sans-serif;
    cursor: pointer;
  }

  button,
  ._btn {
    cursor: pointer;
  }

  ul li {
    list-style: none;
  }

  ._btn-text:hover {
    border-color: #d9b6ff;
    color: #d9b6ff;
    cursor: pointer;
  }
  
  ._btn-icon:hover svg {
    fill: transparent;
    stroke: #acacac;
    cursor: pointer;
  }
  
  ._btn-text:active {
    border-color: #ad61ff;
    color: #ad61ff;
    cursor: pointer;
  }
  
  ._btn-icon:active svg {
    fill: transparent;
    stroke: #ffffff;
    cursor: pointer;
  }
  
  ._btn-icon:active .track-play__like-svg,
  ._btn-icon:active .track-play__dislike-svg {
    fill: #696969;
    stroke: #ffffff;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
  background-color: #383838;
`
const Container = styled.div`
  max-width: 1920px;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: #181818;
`
const Main = styled.main`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;

  -ms-flex-wrap: wrap;
  flex-wrap: wrap;

  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;

  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
`


function App() {
  return (
    <div className='App'>
      <GlobalStyle/>
        <Wrapper>
          <Container>
            <Main>
              <NavMenu/>
              <Tracklist/>
              <Sidebar/>
            </Main>
            <AudioPlayer/>
            <footer className="footer"></footer>
          </Container>
        </Wrapper>
    </div>
  );
}

export default App;

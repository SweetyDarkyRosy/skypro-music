import logo from './logo.svg';
import './App.css';
import AudioPlayer from './components/AudioPlayer'
import Tracklist from './components/Tracklist'
import NavMenu from './components/NavMenu'
import Sidebar from './components/Sidebar'


function App() {
  return (
    <div className="wrapper">
      <div className="container">
        <main className="main">
          <NavMenu/>
          <Tracklist/>
          <Sidebar/>
        </main>
        <AudioPlayer/>
        <footer className="footer"></footer>
      </div>
    </div>
  );
}

export default App;

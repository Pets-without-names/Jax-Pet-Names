import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import AddName from './components/addName';
import ReactGA from 'react-ga4';
import './styles/app.css';

const measurementID = 'G-CG5SKK9RSW';
ReactGA.initialize(measurementID);
ReactGA.send({ hitType: 'pageview', page: window.location.pathname });

function App() {
  return (
    <div className='app-container'>
      <Header></Header>
      <Main></Main>
      <AddName></AddName>
      <Footer></Footer>
    </div>
  );
}

export default App;

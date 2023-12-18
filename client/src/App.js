import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';
import AddName from './components/addName';

function App() {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Header></Header>
      <Main></Main>
      <AddName></AddName>
      <Footer></Footer>
    </div>
  );
}

export default App;

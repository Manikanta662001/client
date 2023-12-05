import logo from './logo.svg';
import './App.css';
import Apiget from './components/Apiget';
import Apipost from './components/Apipost';
import Login from './components/Login';
import Apiput from './components/Apiput';

function App() {
  return (
    <div className="App">
      <Apiget/>
      <Apipost/>
      <Login/>
      <Apiput/>
    </div>
  );
}

export default App;

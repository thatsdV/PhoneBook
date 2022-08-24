import logo from '../../../logo.svg';
import './Home.css';
import { Link } from 'react-router-dom';

export const Home = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Bem vindo à tua lista de contactos
        </p>        
        <Link to='/contact'><button>contactos</button></Link>
        <Link to='/group'><button>grupos</button></Link>
      </header>
    </div>
  );
}

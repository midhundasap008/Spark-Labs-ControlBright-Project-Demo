//import reactLogo from './assets/react.svg'
//import viteLogo from '/vite.svg'
import './App.css';
import Layout from './Layout';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <>
      <Router basename='/'>
        <Layout />
      </Router>
    </>
  )
}

export default App

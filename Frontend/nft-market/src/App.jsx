import MainPage from './Components/Pages/MainPage/MainPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Marketplace from './Components/Pages/MarketPage/MarketPage';
const root = document.getElementById('root');
root.style.maxWidth = 'none';
root.style.margin = '0';
root.style.padding = '0';
root.style.textAlign = 'left';


const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/marketplace" element={<Marketplace />} />
          </Routes>
      </Router>
  );
};

export default App

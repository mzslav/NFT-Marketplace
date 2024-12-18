import MainPage from './Components/Pages/MainPage/MainPage';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Marketplace from './Components/Pages/MarketPage/MarketPage';
import Create from './Components/Pages/CreatePage/CreatePage';
import NFTPage from './Components/Pages/NftPage/NftPage';
import ProfilePage from './Components/Pages/UserProfilePage/UserProfilePage';
import CollectionPage from './Components/Pages/CollectionPage/CollectionPage';


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
              <Route path="/create" element={<Create />} />
              <Route path="/nft/:id" element={<NFTPage />} />
              <Route path="/collection/:collectionId" element={<CollectionPage />} />
              <Route path="/user/:metaMaskAddress" element={<ProfilePage />} />

          </Routes>
      </Router>
  );
};

export default App

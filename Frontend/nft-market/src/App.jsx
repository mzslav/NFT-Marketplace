import MainBlock from './Components/MainBlock'
import Header from './Components/Header';
import SliderBlock from './Components/SliderBlock'
import Footer from './Components/Footer';
import './App.css';

// src/index.js або src/App.js
const root = document.getElementById('root');
root.style.maxWidth = 'none';
root.style.margin = '0';
root.style.padding = '0';
root.style.textAlign = 'left';


function App() {
  return (
    <>
      <Header />
      <MainBlock />
      <SliderBlock />
      <Footer />
   
    </>
  )
    
}

export default App

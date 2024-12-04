import './styles/MainBlock.css';

const MainBlock = () => {
    return (
      <div className="main-block">
      <div className="main-block-content">
        <h1 className="main-block-title">NFT Marketplace</h1>
        <p className="main-block-subtitle">
          Your place to collect, <br />
          research, buy and create <span className="highlighted">NFTs</span>
        </p>
        <button className="main-block-btn">Get Started</button>
      </div>
      <div className="glass-card">
        <img src="/picture/main-slide.png" alt="Logo" className="logo-img" />
      </div>
    </div>
    
    );
};

export default MainBlock;

import './UpperBlock.css';

const UpperBlock = () => {
    return (
        <div className="upper-block">
            <h1 className="title">Buy NFT HERE</h1>
            <div className="filter-container">
                <div className="button-wrapper">
                    <button className="filter-button">Category</button>
                </div>
                <div className="button-wrapper">
                    <button className="filter-button">Sorting</button>
                </div>
                <div className="input-wrapper">
                    <input className="filter-input" type="text" placeholder="Search by author" />
                </div>
                <div className="input-wrapper">
                    <input className="filter-input" type="text" placeholder="Search by price" />
                </div>
            </div>
        </div>
    );
};

export default UpperBlock;

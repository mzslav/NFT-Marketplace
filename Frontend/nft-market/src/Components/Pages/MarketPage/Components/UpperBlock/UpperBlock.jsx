import { useState } from 'react';
import PropTypes from 'prop-types';
import './UpperBlock.css';

const UpperBlock = ({ changeSorting }) => {
    const [categoryState, setCategoryState] = useState(0); 
    const [sortingState, setSortingState] = useState(0); 
    const [searchAuthor, setSearchAuthor] = useState(''); 
    const [searchPrice, setSearchPrice] = useState('');


    const handleCategoryChange = () => {
        let newCategory;
        if (categoryState === 0) {
            newCategory = 'isAuctioned:true'; 
        } else if (categoryState === 1) {
            newCategory = 'isAuctioned:false'; 
        } else {
            newCategory = ''; 
        }

        setCategoryState((prev) => (prev + 1) % 3); 
        changeSorting(newCategory, sortingState === 0 ? 'asc' : sortingState === 1 ? 'desc' : 'asc', searchAuthor, searchPrice); 
    };

  
    const handleSortingChange = () => {
        let newSortingOrder;
        if (sortingState === 0) {
            newSortingOrder = 'asc'; 
        } else if (sortingState === 1) {
            newSortingOrder = 'desc'; 
        } else {
            newSortingOrder = ''; 
        }

        setSortingState((prev) => (prev + 1) % 3); 
        changeSorting(categoryState === 0 ? '' : categoryState === 1 ? 'isAuctioned:true' : 'isAuctioned:false', newSortingOrder, searchAuthor, searchPrice);
    };

 
    const handleSearchChange = (e, type) => {
        const value = e.target.value;
        if (type === 'author') {
            setSearchAuthor(value);
        } else if (type === 'price') {
            setSearchPrice(value);
        }
        changeSorting(categoryState === 0 ? '' : categoryState === 1 ? 'isAuctioned:true' : 'isAuctioned:false', sortingState === 0 ? 'asc' : sortingState === 1 ? 'desc' : '', value, type === 'author' ? searchPrice : searchAuthor);
    };

    return (
        <div className="upper-block">
            <h1 className="title">MINT NFT HERE</h1>
            <div className="filter-container">
                <div className="button-wrapper">
                    <button className="filter-button" onClick={handleCategoryChange}>
                        {categoryState === 0 ? 'Category' : categoryState === 1 ? 'Auctioned' : 'On Sale'}
                    </button>
                </div>
                <div className="button-wrapper">
                    <button className="filter-button" onClick={handleSortingChange}>
                        {sortingState === 0 ? 'Created At' : sortingState === 1 ? 'Older' : 'Newer'}
                    </button>
                </div>
                <div className="input-wrapper">
                    <input 
                        className="filter-input" 
                        type="text" 
                        placeholder="Search by author" 
                        value={searchAuthor}
                        onChange={(e) => handleSearchChange(e, 'author')}
                    />
                </div>
                <div className="input-wrapper">
                    <input 
                        className="filter-input" 
                        type="text" 
                        placeholder="Search by price" 
                        value={searchPrice}
                        onChange={(e) => handleSearchChange(e, 'price')}
                    />
                </div>
            </div>
        </div>
    );
};

UpperBlock.propTypes = {
    changeSorting: PropTypes.func.isRequired, 
};

export default UpperBlock;

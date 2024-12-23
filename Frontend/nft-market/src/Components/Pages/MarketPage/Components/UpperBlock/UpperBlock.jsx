import { useState } from 'react';
import PropTypes from 'prop-types';
import './UpperBlock.css';

const UpperBlock = ({ changeSorting }) => {
    const [categoryState, setCategoryState] = useState(0); // Логіка для кнопки "Category"
    const [sortingState, setSortingState] = useState(0); // Логіка для кнопки "Sorting"
    const [searchAuthor, setSearchAuthor] = useState(''); // Для пошуку по автору
    const [searchPrice, setSearchPrice] = useState(''); // Для пошуку по ціні

    // Обробник для кнопки категорії (по аукціону)
    const handleCategoryChange = () => {
        let newCategory;
        if (categoryState === 0) {
            newCategory = 'isAuctioned:true'; // Перший натиск - сортування по isAuctioned: true
        } else if (categoryState === 1) {
            newCategory = 'isAuctioned:false'; // Другий натиск - сортування по isAuctioned: false
        } else {
            newCategory = ''; // Третій натиск - скидає
        }

        setCategoryState((prev) => (prev + 1) % 3); // Оновлюємо стан кнопки
        changeSorting(newCategory, sortingState === 0 ? 'asc' : sortingState === 1 ? 'desc' : 'asc', searchAuthor, searchPrice); // Передаємо параметри сортування
    };

    // Обробник для кнопки сортування (по createdAt)
    const handleSortingChange = () => {
        let newSortingOrder;
        if (sortingState === 0) {
            newSortingOrder = 'asc'; // Перший натиск - сортування по зростанню
        } else if (sortingState === 1) {
            newSortingOrder = 'desc'; // Другий натиск - сортування по спаданню
        } else {
            newSortingOrder = ''; // Третій натиск - скидає
        }

        setSortingState((prev) => (prev + 1) % 3); // Оновлюємо стан кнопки
        changeSorting(categoryState === 0 ? '' : categoryState === 1 ? 'isAuctioned:true' : 'isAuctioned:false', newSortingOrder, searchAuthor, searchPrice);
    };

    // Обробка змін в полях вводу
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
    changeSorting: PropTypes.func.isRequired, // Вказуємо, що changeSorting має бути функцією
};

export default UpperBlock;

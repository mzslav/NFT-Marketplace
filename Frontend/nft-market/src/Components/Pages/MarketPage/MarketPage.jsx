import { useState } from 'react';

import Header from '../../Header/Header';
import UpperBlock from './Components/UpperBlock/UpperBlock';
import CardList from './Components/CardList/CardList';


const Marketplace = () => {
    const [sortParams, setSortParams] = useState({
        category: '', // Початкова категорія
        sortOrder: 'asc', // Початковий порядок сортування
    });

    const changeSorting = (category, sortOrder) => {
        setSortParams({ category, sortOrder });
    };

    return (
        <>
            <Header />
            <UpperBlock changeSorting={changeSorting} />
            <CardList sortParams={sortParams} />
            
        </>
    );
};

export default Marketplace;

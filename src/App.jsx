import React, { useState, useEffect } from 'react';
import { Route, Routes, Outlet, Link } from 'react-router-dom';
import Wheel from './components/Wheel/Wheel'; // Import your Wheel component
import PreferenceForm from './components/preferenceForm/PreferenceForm';
import FoodList from './components/foodlist/FoodList';

const App = () => {
    const [foodData, setFoodData] = useState({});
    const [foodSelection, setFoodSelection] = useState({});
    
    // Load stored data from localStorage on initial render
    useEffect(() => {
        const storedFoodData = JSON.parse(localStorage.getItem('foodData'));
        if (storedFoodData) {
            setFoodData(storedFoodData);
        }
    }, []);

    return (
        <div className='app-container'>
            <Routes>
                <Route path='/' element={<PreferenceForm foodData={foodData} setFoodData={setFoodData} />} />
                {foodData.allFoods && foodData.budget ? (
                    <Route path='wheel' element={<Wheel setFoodSelection={setFoodSelection} foodData={foodData} />} />
                ) : null}
                <Route path='foodlist' element={<FoodList foodSelection={foodSelection} />} />
            </Routes>
        </div>
    );
};

export default App;

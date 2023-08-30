import React, { useState } from 'react';
import { Route, Routes, Outlet, Link } from 'react-router-dom';
import Wheel from './components/Wheel/Wheel'; // Import your Wheel component
import PreferenceForm from './components/preferenceForm/PreferenceForm';
import FoodList from './components/foodlist/FoodList';

const App = () => {
    const [foodData, setFoodData] = useState({});
    const [foodSelection, setFoodSelection] = useState({});
    return (
        <div>
            <h1>Wheel of Fortune App</h1>
            <Routes>
                <Route path='/' element={<PreferenceForm setFoodData={setFoodData} />} />
                {foodData.allFoods && foodData.budget ? (
                    <Route path='wheel' element={<Wheel setFoodSelection={setFoodSelection} foodData={foodData} />} />
                ) : null}
                <Route path='foodlist' element={<FoodList foodSelection={foodSelection} />} />
            </Routes>
        </div>
    );
};

export default App;


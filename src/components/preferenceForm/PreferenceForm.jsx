import React, { useEffect, useState } from 'react';
import axios, { all } from 'axios';
import './PreferenceForm.css'; // Import your CSS file for styling
import { Link, useNavigate, } from 'react-router-dom';

const PreferenceForm = ({ setFoodData, foodData }) => {

    const navigate = useNavigate();

    const [allFoods, setAllFoods] = useState([]);
    const [foodCraving, setFoodCraving] = useState('');
    const [budget, setBudget] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const handleFoodCravingChange = async (event) => {
        const newValue = event.target.value;
        setFoodCraving(newValue);

        if (newValue.length >= 3) {
            try {
                const response = await axios.get('/autocomplete', {
                    params: {
                        text: newValue,
                    },
                });
                setSuggestions(response.data.terms.map(term => term.text));
            } catch (error) {
                console.error('Error fetching suggestions:', error);
            }
        } else {
            setSuggestions([]);
        }
    };


    const handleBudgetChange = (event) => {
        if (event.target.value === '$') setBudget({ price: 1, value: event.target.value });
        else if (event.target.value === '$$') setBudget({ price: 2, value: event.target.value });
        else if (event.target.value === '$$$') setBudget({ price: 3, value: event.target.value });
        else if (event.target.value === '$$$$') setBudget({ price: 4, value: event.target.value });
        else setBudget(event.target.value);
    };

    const addFood = () => {
        if (allFoods.length > 4 || !foodCraving) return;
        const updatedData = [...allFoods, foodCraving];
        setAllFoods(updatedData)
        setFoodCraving('');
        setSuggestions([]);
    }

    const handleSuggestions = (suggestion) => {
        const updatedData = [...allFoods, suggestion];
        setAllFoods(updatedData);
        setSuggestions([]);
        setFoodCraving('');
    }


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const position = await handleGetLocation();
            const { latitude: lat, longitude: long } = position.coords;
            if (allFoods.length > 1 && budget) {
                setFoodData(prevData => ({
                    ...prevData,
                    allFoods,
                    budget,
                    location: {
                        lat,
                        long
                    }
                }));
                localStorage.setItem('foodData', JSON.stringify({
                    ...foodData,
                    allFoods,
                    budget,
                    location: {
                        lat,
                        long
                    }
                }));
                navigate('wheel');
            } else {
                alert('Fill out required fields');
            }
        } catch (error) {
            console.error({ error })
        }
    };

    const getLocation = () => new Promise((resolve, reject) =>
        navigator.geolocation.getCurrentPosition(resolve, reject)
    );

    const handleGetLocation = async () => {
        try {
            const position = await getLocation();
            return position;
        } catch (error) {
            console.error('Error getting location:', error);
        }
    };

    return (
        <div className="form-container">
            <h2>Customize Your Food Experience</h2>
            <p className='p-header'>Please fill the form below to create your personalized food selection and discover the perfect dining options that match your cravings and budget.</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="foodCraving">Enter the foods you're craving (at least 2):</label>
                <div className='foodCravingInputandButton' >
                    <input
                        type="text"
                        id="foodCraving"
                        value={foodCraving}
                        onChange={handleFoodCravingChange}
                        autoComplete='off'
                        disabled={allFoods.length > 4 ? true : false}
                    />
                    <button type='button' onClick={addFood} className='enterFoodButton' id='foodCraving' >Enter</button>
                </div>
                <div className='suggestionsContainer'>
                    <ul className='suggestionsList'>
                        {suggestions.map((suggestion, index) => (
                            <li
                                key={`${index}suggestion`}
                                onClick={() => handleSuggestions(suggestion)}
                            >{suggestion}</li>
                        ))}
                    </ul>
                </div>

                <div className='foodListContainer'>
                    {allFoods.map((food, i) => (
                        <p
                            onClick={() => {
                                const newFoods = allFoods.filter(foodItem => food !== foodItem)
                                setAllFoods(newFoods);
                            }}
                            key={`${i}${food}`} >{food}</p>
                    ))}
                </div>

                <label className='budgetLabel' htmlFor="budget">Select your expense preference:</label>
                <select id="budget" value={budget.value} onChange={handleBudgetChange}>
                    <option value="">Select budget</option>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                </select>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PreferenceForm;

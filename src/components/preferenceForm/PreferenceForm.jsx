import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './PreferenceForm.css'; // Import your CSS file for styling

const PreferenceForm = () => {
    const [allFoods, setAllFoods] = useState([]);
    const [foodCraving, setFoodCraving] = useState('');
    const [location, setLocation] = useState({ lat: '', long: '' });
    const [budget, setBudget] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [locSuggestions, setLocSuggestions] = useState([]);

    const handleFoodCravingChange = async (event) => {
        const newValue = event.target.value;
        setFoodCraving(newValue);

        if (newValue.length >= 3) {
            try {
                const response = await axios.get(' http://localhost:3001/yelp/autocomplete', {
                    params: {
                        text: newValue,
                        categories: 'food'
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
        if (event.target.value === '$') setBudget(1);
        else if (event.target.value === '$$') setBudget(2);
        else if (event.target.value === '$$$') setBudget(3);
        else if (event.target.value === '$$$$') setBudget(4);
        else setBudget(event.target.value);
    };

    const addFood = () => {
        const updatedData = [...allFoods];
        updatedData.push(foodCraving);
        setAllFoods(updatedData)
        setFoodCraving('');
    }

    const handleSuggestions = (suggestion) => {
        setFoodCraving(suggestion);
        setSuggestions([]);
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        if (allFoods.length > 1 && budget) {
            console.log('Budget:', budget);
            console.log('all foods:', allFoods);
        } else {
            alert('Fill out required fields')
        }
    };


    const getLocation = () => {
        navigator.geolocation.getCurrentPosition((posititon) => {
            let lat = posititon.coords.latitude;
            let long = posititon.coords.longitude;

            setLocation({
                lat,
                long,
            })
        })
    }

    // useEffect(() => {
    //     console.log(location)
    // }, [location])
    

    return (
        <div className="form-container">
            <h2>Food Craving Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="foodCraving">What foods are you craving? (Type at LEAST 2 foods)</label>
                <div className='foodCravingInputandButton' >
                    <input
                        type="text"
                        id="foodCraving"
                        value={foodCraving}
                        onChange={handleFoodCravingChange}
                        autoComplete='off'
                        disabled={allFoods.length > 4 ? true : false}
                    />
                    <button type='button' onClick={addFood} className='enterFoodButton' id='foodCraving' >Enter food</button>
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

                <label htmlFor="budget">How much do you want to spend?</label>
                <select id="budget" value={budget} onChange={handleBudgetChange}>
                    <option value="">Select budget</option>
                    <option value="$">$</option>
                    <option value="$$">$$</option>
                    <option value="$$$">$$$</option>
                    <option value="$$$$">$$$$</option>
                </select>

                <button onClick={getLocation} type="button">get location: </button>
                <p>Long: {location.long} Lat: {location.lat}</p>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default PreferenceForm;

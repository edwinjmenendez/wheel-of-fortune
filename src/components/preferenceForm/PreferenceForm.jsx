import React, { useState } from 'react';
import './PreferenceForm.css'; // Import your CSS file for styling

const PreferenceForm = () => {
    const [allFoods, setAllFoods] = useState(['hello', 'world', 'narrator', 'is', 'here']);
    const [foodCraving, setFoodCraving] = useState('');
    const [locationPreference, setLocationPreference] = useState('');
    const [budget, setBudget] = useState('');

    const handleFoodCravingChange = (event) => {
        setFoodCraving(event.target.value);
    };

    const handleLocationPreferenceChange = (event) => {
        setLocationPreference(event.target.value);
    };

    const handleBudgetChange = (event) => {
        setBudget(event.target.value);
    };

    const addFood = () => {
        const updatedData = [...allFoods];
        updatedData.push(foodCraving);
        setAllFoods(updatedData)
        setFoodCraving('');
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (allFoods.length > 1 && locationPreference) {
            console.log('Location Preference:', locationPreference);
            console.log('Budget:', budget);
            console.log('all foods:', allFoods);
        } else {
            alert('Fill out required fields')
        }
    };

    return (
        <div className="form-container">
            <h2>Food Craving Form</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="foodCraving">What foods are you craving?</label>
                <div className='foodCravingInputandButton' >
                    <input
                        type="text"
                        id="foodCraving"
                        value={foodCraving}
                        onChange={handleFoodCravingChange}
                    />
                    <button type='button' onClick={addFood} className='enterFoodButton' id='foodCraving' >Enter food</button>
                </div>
                <div className='foodListContainer'>
                    {allFoods.map((food, i) => (
                        <p
                            onClick={() => {
                                const newFoods =  allFoods.filter(foodItem => food !== foodItem)
                                setAllFoods(newFoods);
                            }}
                            key={`${i}${food}`} >{food}</p>
                    ))}
                </div>

                <label htmlFor="locationPreference">What is your location preference?</label>
                <input
                    type="text"
                    id="locationPreference"
                    value={locationPreference}
                    onChange={handleLocationPreferenceChange}
                />

                <label htmlFor="budget">How much do you want to spend?</label>
                <select id="budget" value={budget} onChange={handleBudgetChange}>
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

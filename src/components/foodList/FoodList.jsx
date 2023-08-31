import React, { useEffect, useState } from 'react'
import Food from '../Food/Food'
import axios from 'axios'
import './foodList.css'

const FoodList = ({ foodSelection }) => {

    const [data, setData] = useState();

    const getResults = async (foodSel) => {
        try {
            const repsonse = await axios.get('http://localhost:3001/results', {
                params: {
                    term: foodSel.food,
                    longitude: foodSel.location.long,
                    latitude: foodSel.location.lat,
                    price: foodSel.budget.price
                }
            })
            const { businesses } = repsonse.data;
            setData(businesses);
            return businesses;
        } catch (error) {
            console.error({ error })
        }
    }

    useEffect(() => {
        const storedFoodSelectionData = JSON.parse(localStorage.getItem('foodSelection'));
        if (storedFoodSelectionData) {
            return getResults(storedFoodSelectionData);
        }
        getResults(foodSelection);
    }, [foodSelection])

    return (
        <div className='food-list'>
            {data ? data.map(business => (
                <Food key={business.id} business={business} />
            )) :
            <p>Loading Data . . .</p>
            }
        </div>
    )
}

export default FoodList
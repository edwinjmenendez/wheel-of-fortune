import React, { useEffect, useState } from 'react'
import Food from '../Food/Food'
import axios from 'axios'

const FoodList = ({ foodSelection }) => {

    const [data, setData] = useState();

    const getResults = async () => {
        try {
            console.log(foodSelection)
            const repsonse = await axios.get('http://localhost:3001/results', {
                params: {
                    term: foodSelection.food,
                    longitude: foodSelection.location.long,
                    latitude: foodSelection.location.lat,
                    price: foodSelection.budget.price
                }
            })
            console.log(repsonse)
            const { businesses } = repsonse.data;
            setData(businesses);
        } catch (error) {
            console.error({ error })
        }
    }

    useEffect(() => {
        console.log(getResults())
    }, [foodSelection])

    return (
        <div>
            {data && data.map(business => (
                <Food business={business} />
            ))}
        </div>
    )
}

export default FoodList
import React, { useState, useEffect } from 'react';
import WheelComponent from 'react-wheel-of-prizes'
import './Wheel.css'
import { useNavigate } from 'react-router-dom';

const Wheel = ({ foodData, setFoodSelection }) => {
    
    const navigate = useNavigate();

    const segColors = [
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F'
    ];

    // Initialize the answer state with a default value
    const [answer, setAnswer] = useState('');
    const [hasSpun, setHasSpun] = useState(false);

    const onFinished = (winner) => {        
        // Update the answer state with the randomWinner
        setAnswer(winner);
        setHasSpun(true);
        setFoodSelection({
            food: winner,
            location: foodData.location,
            budget: foodData.budget
        })
        return winner; // Return the winner to the WheelComponent
    };

    const handleClick = () => {
        navigate('/foodlist');
    }

    useEffect(() => {
        console.log('hasspun in useEffect:', hasSpun);
    }, [hasSpun]);

    return (
        <div className='wheel-container'>
            <WheelComponent
                segments={foodData.allFoods}
                segColors={segColors}
                winningSegment={answer}
                onFinished={(winner) => onFinished(winner)}
                primaryColor='black'
                contrastColor='white'
                buttonText={hasSpun ? 'No more spins' : 'Spin'}
                isOnlyOnce={true}
                size={200}
                upDuration={100}
                downDuration={1000}
                fontFamily='Arial'
            />
            {hasSpun && <button
                onClick={handleClick}>
                See Results
            </button>}
        </div>
    );
};

export default Wheel;

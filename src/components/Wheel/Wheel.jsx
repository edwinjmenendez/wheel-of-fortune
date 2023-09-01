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

    const [answer, setAnswer] = useState('');
    const [hasSpun, setHasSpun] = useState(false);

    const onFinished = (winner) => {
        setAnswer(winner);
        setHasSpun(true);
        setFoodSelection({
            food: winner,
            location: foodData.location,
            budget: foodData.budget
        });
        localStorage.setItem('foodSelection', JSON.stringify({
            food: winner,
            location: foodData.location,
            budget: foodData.budget
        }));
        return winner;
    };

    const handleClick = () => {
        navigate('/foodlist');
    }

    return (
        <div className='wheel-container'>
            <h1>Take the Wheel for a Spin (One Spin Only)</h1>
            {hasSpun && <button
                onClick={handleClick}>
                See Results
            </button>}
            <WheelComponent
                segments={foodData.allFoods}
                segColors={segColors}
                winningSegment={answer}
                onFinished={(winner) => onFinished(winner)}
                primaryColor='black'
                contrastColor='white'
                buttonText={hasSpun ? 'No more spins' : 'Spin'}
                isOnlyOnce={true}
                size={290}
                upDuration={100}
                downDuration={1000}
                fontFamily='Arial'
            />
        </div>
    );
};

export default Wheel;

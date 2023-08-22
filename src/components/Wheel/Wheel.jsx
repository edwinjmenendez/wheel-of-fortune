import React, { useState, useEffect } from 'react';
import WheelComponent from 'react-wheel-of-prizes'
import './Wheel.css'

const Wheel = () => {
    const segments = [
        'Sushi',
        'Pizza',
        'Burgers',
        'Italian',
        'pasta',
        'beer',
        'bars',
        'poke'
    ];
    const segColors = [
        '#EE4040',
        '#F0CF50',
        '#815CD1',
        '#3DA5E0',
        '#34A24F',
        '#F9AA1F',
        '#EC3F3F',
        '#FF9000'
    ];

    // Initialize the answer state with a default value
    const [answer, setAnswer] = useState('');
    const [hasSpun, setHasSpun] = useState(false);

    const onFinished = (winner) => {
        // Calculate the random index and winner
        const randomIndex = Math.floor(Math.random() * segments.length);
        const randomWinner = segments[randomIndex];
        
        // Update the answer state with the randomWinner
        setAnswer(winner);

        // Logs might not show the updated value immediately due to asynchronous state update
        console.log('Current answer:', answer); // May show the previous value
        console.log('Random winner:', randomWinner); // Should show the correct random winner
        console.log('winner:', winner); // Should show the correct random winner
        setHasSpun(true);
        return winner; // Return the winner to the WheelComponent
    };

    useEffect(() => {
        console.log('Updated answer in useEffect:', answer);
    }, [answer]);

    return (
        <div className='wheel-container'>
            <WheelComponent
                segments={segments}
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
            <p>Current answer: {answer}</p>
        </div>
    );
};

export default Wheel;

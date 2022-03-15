import React, {useState} from 'react';

const CounterComponent = () => {

    const [number, setNumber] = useState({
        firstNumber: 0,
        secondNumber: 10
    })

    const increment = () => {
        setNumber({
            firstNumber: number.firstNumber + 1,
            secondNumber: number.secondNumber + 1,
        })
    };

    const decrement = () => {
        setNumber({
            firstNumber: number.firstNumber - 1,
            secondNumber: number.secondNumber - 1,
        })
    };

    return (
        <div>
            <button style={{padding: '15px', margin: '5px'}}
                    onClick={decrement}>Minus
            </button>
            <button style={{padding: '15px', margin: '5px'}}
                    onClick={increment}>Plus
            </button>
            <span>{number.firstNumber} /// </span>
            <span>{number.secondNumber}</span>
        </div>
    );
};

export default CounterComponent;
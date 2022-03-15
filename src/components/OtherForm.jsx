import SecondInput from "./UI/input/SecondInput";
import SecondButton from "./UI/button/SecondButton";
import React, {useRef, useState} from "react";

const OtherForm = ({create}) => {
    const [error, setError] = useState(false)

    const secondInputRef = useRef('')

    const secondInputFunction = () => {
        console.log(secondInputRef.current.value)
    }

    const formSubmit = (event) => {
        event.preventDefault()
        if (secondInputRef.current.value == '') {
            setError(true)
            console.log('Error!')
        } else {
            setError(false)
            console.log('No Error!')
            const post = {
                id: Date.now(),
                body: secondInputRef.current.value,
                title: 'Random',
            }
            create(post)
            console.log('Submitted! Value: ' + secondInputRef.current.value)
            secondInputRef.current.value = ''
        }
    };

    return (
        <form>
            {error == true
                ? <h1 style={{ textAlign: 'center', marginBottom: '10px'}}>Error = true</h1>
                : <h1 style={{ textAlign: 'center', marginBottom: '10px'}}>No Error!</h1>}
            <SecondInput ref={secondInputRef}
                         onChange={secondInputFunction}
                         type={"text"}
                         placeholder={"Type something"}/>
            <SecondButton onClick={formSubmit}>Submit Button!</SecondButton>
        </form>
    );
};

export default OtherForm;
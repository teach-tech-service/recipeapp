import React from "react";

const Step = props => {
    return (
        <div>
            <h1>Krok {props.number}: Przykładowy krok</h1>
            <p>{props.description}</p>
        </div>
    );
};

export default Step;

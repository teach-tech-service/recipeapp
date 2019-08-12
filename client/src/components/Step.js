import React from "react";

const Step = props => {
    return (
        <div>
            <h2>Krok {props.number}: Przykładowy krok</h2>
            <p>{props.description}</p>
        </div>
    );
};

export default Step;

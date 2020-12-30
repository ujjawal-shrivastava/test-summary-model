import React from 'react';

const Prompt = ({Display_Data,HandleError}) => {
    return (
        <div className="prmpt">
            <h2>{Display_Data}</h2>
            <button onClick={HandleError}>Got it!</button>
        </div>
    );
}

export default Prompt;
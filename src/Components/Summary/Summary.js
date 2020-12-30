import React,{useState,useEffect} from 'react';
import Typist from 'react-typist';

const Summary = ({summaryData}) => {

    console.log(summaryData);
    return (
        <div className="summary">
            <h1>Here's your text's summary!</h1>
            {/* <textarea className="txtS" value={summaryData} 
            readonly rows="10" cols="7"> */}
            <div style={{fontSize:"2rem",width:"80%",border:"2px solid yellow",
            overflowY:'scroll',padding:"4%",background:"white",color:"black",
            textShadow:"none",borderRadius:"5px"}}>
                <Typist>{summaryData}</Typist>
            </div>
        </div>
    );
}

export default Summary;
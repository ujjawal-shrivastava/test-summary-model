import React from 'react';

const TermRefine = ({terms}) => {
    

    const data1=Array.from(terms);
    return (
        <div className="refine">
            <h1>Here are some terms you should check out!</h1>
            <div className="ref-1">
                {
                    data1.map((item)=>{
                        return <a href={item.url} key={item.word}>{item.word}</a>
                    })
                }
            </div>
        </div>
    )
}

export default TermRefine;

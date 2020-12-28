import React,{useState} from 'react';
import Fileprompt from '../Fileprompt/Fileprompt';
import '../../Mainer.css';

const Summarize = () => {
    const [flag,toggle]=useState(false);
    const [Main_Data,Fetch]=useState('');

    const HandleToggle=()=>{
        toggle(!flag);
    }

    const GetData=(data)=>{
        HandleToggle();
        Fetch(data.text);
        console.log(Main_Data);
    }

    return (
        <div>
        <div className="sumr" 
        style={{filter:flag?'blur(5px)':'none',pointerEvents:flag?'none':'all'}}>
            <h1>
                Summarize your text! Its super simple just choose file type and upload
                it and then get your summary in a jiffy!
            </h1>
            <button onClick={HandleToggle}>Choose Medium</button>
        </div>
            {
                flag?<Fileprompt HandleToggle={HandleToggle} GetData={GetData}/>:null
            }
        </div>
    )
}

export default Summarize;

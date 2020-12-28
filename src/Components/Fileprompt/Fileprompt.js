import React,{useState} from 'react';
import Cancel from '../../Images/cancelLogo/cancel.png';

const Fileprompt = ({HandleToggle,GetData}) => {

    const [type,ChangeType]=useState('file');
    const [text,UpdateText]=useState('');

    const HandleChange=(evt)=>{
        if(!evt.target.value.trim()){
            return;
        }
        UpdateText(evt.target.value.trim());
    }

    const HandleSubmit=()=>{
        if(type==='text')
        {
            console.log(type,' ',text);
            return GetData({data:text,type:type});
        }
    }

    const OnUpload=(evt)=>{
        console.log(evt.target.files);
    }

    return (
        <div className="popup">
            <img src={Cancel} alt="$" onClick={HandleToggle}/>
            <ul>
                <li
                style={{background:type==='file'?'blue':'transparent'}} 
                onClick={()=>ChangeType('file')}>File(Pdf/Image)</li>
                <li className='tl'
                style={{background:type==='text'?'red':'transparent'}} 
                onClick={()=>ChangeType('text')}>Raw Text</li>
            </ul>
            {
                type==='file'
                ?<div className="fl" style={{background:"blue"}}>
                    <p>Upload as an Image or as a pdf to get your text scanned.</p>
                    <input type="file" accept="image/jpeg,image/png,application/pdf"
                    onChange={OnUpload}/>
                </div>
                :<div className='txt' style={{background:"red"}}>
                    <p>Type your text here!</p>
                    <textarea onChange={HandleChange}></textarea>
                </div>
            }
        <button onClick={HandleSubmit}>Submit</button>
        </div>
    );
}

export default Fileprompt;
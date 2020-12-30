import React,{useState,useEffect,useRef} from 'react';
import Fileprompt from '../Fileprompt/Fileprompt';
import Cookies from 'js-cookie';
import Typist from 'react-typist';
import { animateScroll as scroll } from 'react-scroll';
import Prompt from '../Prompt/Prompt';
import TextEditor from '../Editor/TextEditor';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Loader from '../Loader/Loader';
import { FilterText } from '../Utility/DataFilter';
import '../../Mainer.css';
import gsap from 'gsap/all';

const Services = () => {

    gsap.registerPlugin(ScrollTrigger);

    const [flag,toggle]=useState(false);
    const [Main_Data,Fetch]=useState(Cookies.get('textkey'));
    const [Loading,UpdateLoader]=useState(false);
    const [summary,UpdateSum]=useState(false);
    const [refine,UpdateRef]=useState(false);
    const [IsError,UpdateError]=useState(false);
    const [JsonData,UpdateJson]=useState(null);
    const [ResultFlag,UpdateResult]=useState(true);

    const hdr1=useRef(null);

    const HandleToggle=()=>{
        toggle(!flag);
    }

    const HandleError=()=>{
        return UpdateError(false);
    }
    
    const HandleLoader=()=>{
        if(!(summary||refine)){
            return UpdateError(true);
        }
        UpdateLoader(!Loading);
    }

    const GetData=(data)=>{
        HandleToggle();
        data=FilterText(data);
        Cookies.set('textkey',data.data_string);
        Fetch(data.data_string);
        UpdateJson(data.data_json);
    }

    const HandleCheckboxChange=(flag)=>{
        if(flag===1){
            UpdateSum(!summary);
        }else{
            UpdateRef(!refine);
        }
    }

    const RemoveData=()=>{
        if(!Cookies.get('textkey') || typeof Cookies.get('textkey') == undefined){
            return;
        }
        Cookies.remove('textkey');
        Fetch(null);
    }

    const HandleFetch=(data)=>{
        Fetch(data);
    }

    useEffect(()=>{

        window.onload=()=>{
            scroll.scrollToTop();
        }

        if(Cookies.get('textkey')){
            Fetch(Main_Data);
            console.log(Main_Data);
        }
        gsap.from(hdr1.current,{
            scaleX:0,
            scrollTrigger:{
                trigger:hdr1.current,
                toggleActions:"restart reverse play none"
            },
            transformOrigin:'left left',
            delay:1,
            duration:1,
            ease:"power3",
            opacity:0
        });
    },[Main_Data]);

    return (
        <div>
        <div className="sumr" 
        style={{filter:flag?'blur(5px)':'none',pointerEvents:flag?'none':'all'}}>
            <h1 ref={hdr1}>Do so much with your text!</h1>
            <h3>
                Whether its your long & daunting paragraph or be it the overwhelming terms
                that do the former,We got you!
            </h3>
            <h3>Summarizing your text or Refining its terms, All done in a Jiffy for ya!</h3>
        </div>
        {!Main_Data
        ?<div className="sumr1" style={{filter:flag?'blur(5px)':'none',pointerEvents:flag?'none':'all'}}>
            <h2 id="txts1">Okay, Its Show-Time!😎</h2>
            <h2>
                First upload your text in the form of pdf/image/rawtext and then
                Choose your service be it the Servicesr or TermRefiner or both!
            </h2>
            <h2>Go on give it a try!</h2>
            <button className="med" onClick={HandleToggle}>Choose Medium</button>
        </div>
        :<div style={{filter:Loading||IsError?'blur(5px)':'none',
        pointerEvents:Loading||IsError?'none':'all'}}>
            <div className="sumrMainer">
                <h1>
                    Here's the preview of your respective text! Edit as you like and then submit to
                    get the results.
                </h1>
                <TextEditor Main_Data={Main_Data} HandleFetch={HandleFetch}/>
            </div>
            <div className="chkbx">
                <div className='chbx1'>
                    <input type="checkbox" onChange={()=>HandleCheckboxChange(1)}/>
                    <h2>Services text</h2>
                </div>
                <div className="chbx2">
                    <input type="checkbox" onChange={()=>HandleCheckboxChange(0)}/>
                    <h2>Refine Terminologies</h2>
                </div>
            </div>
            <div className="butns">
                <button className="buts" onClick={HandleLoader}>Process</button>
                <button className="butf" onClick={RemoveData}>New File</button>
            </div>
            {
                ResultFlag
                ?<div className="summary">
                    <h1>Here's your text's summary!</h1>
                    <div className='txtS'>
                        <Typist>
                            This is the text which should be printed
                            here!
                        </Typist>
                    </div>
                </div>
                :null
            }
        </div>
        }
        {
            Loading?<Loader />:null
        }
        {
            flag?<Fileprompt HandleToggle={HandleToggle} GetData={GetData}/>:null
        }
        {
            IsError?<Prompt Display_Data={"Please select atleast one option!"}
            HandleError={HandleError}/>:null
        }
        </div>
    )
}

export default Services;
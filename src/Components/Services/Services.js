import React,{useState,useEffect,useRef} from 'react';
import Fileprompt from '../Fileprompt/Fileprompt';
import Cookies from 'js-cookie';
import axios from 'axios';
import { animateScroll as scroll } from 'react-scroll';
import Prompt from '../Prompt/Prompt';
import TextEditor from '../Editor/TextEditor';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Summarizr from '../Summary/Summary';
import TermRefine from '../TermRefine/TermRefine';
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
    const [IsError,UpdateError]=useState('');
    const [ResultFlag,UpdateResult]=useState(false);
    const [responseData, UpdateResponseData]=useState({
        summary:"",
        refined:""
    })

    const hdr1=useRef(null);

    const HandleToggle=()=>{
        toggle(!flag);
    }

    const HandleError=()=>{
        return UpdateError(false);
    }
    
    const HandleLoader=()=>{
        if(!(summary||refine)){
            return UpdateError("Please select atleast one option!");
        }
        SendRequest();
    }

    const RemoveDuplicate=(data)=>{
        var new_arr=[],obj={};
        for(var i=0;i<data.length;i++){
            if(!obj[data[i].word]){
                new_arr.push(data[i]);
                obj[data[i].word]=true;
            }
        }
        return new_arr;
    }

    const ReturnLine=(data)=>{
        var str='';
        Object.values(data).map((key,val)=>{
            str+=key;
        })
        return str;
    }

    const ReturnTerms=(data)=>{
        var terms=[];
        Object.values(data).map((k,v)=>{
            k.map(item=>{
                terms.push(item);
            })
        })
        return terms;
    }

    const GetData=(data)=>{
        HandleToggle();
        Cookies.set('textkey',data);
        Fetch(data);
    }

    const SendRequest=()=>{
        UpdateLoader(true);
        var formData=new FormData();
        var type='';
        if(summary&&refine){
            type="BOTH";
        }else{
            if(summary){
                type="SUMMARY";
            }else{
                type="TERMS";
            }
        }
        formData.append('mode',type);
        formData.append('data',FilterText(Main_Data));
        axios({
            method: 'post',
            url: 'http://23.22.230.118/api/summarize',
            data: formData,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
            },
        })
        .then(function (response) {
            UpdateLoader(false);
            UpdateResult(true);
            if(response.data.mode==="BOTH"){
                UpdateResponseData({refined:ReturnTerms(response.data.terms),summary:ReturnLine(response.data.summary)});
                UpdateSum(true);
                UpdateRef(true);
            }
            else{
                if(response.data.mode==="SUMMARY"){
                    UpdateResponseData({...responseData,summary:ReturnLine(response.data.summary)});
                    UpdateSum(true);
                }
                else{
                    console.log(response.data.terms);
                    UpdateResponseData({...responseData,refined:ReturnTerms(response.data.terms)});
                    UpdateRef(true);
                }
            }
        })
        .catch(function (error) {
            UpdateLoader(false);
            UpdateError("Looks like something is wrong! Try again!");
            console.log(error);
        });
    }

    const HandleCheckboxChange=(flag)=>{
        if(flag===1){
            UpdateSum(!summary);
        }else{
            UpdateRef(!refine);
        }
    }

    const RemoveData=()=>{
        UpdateResult(false);
        UpdateSum(false);
        UpdateRef(false);
        Fetch(null);
    }

    const HandleFetch=(data)=>{
        Fetch(data);
    }

    useEffect(()=>{

        window.onload=()=>{
            scroll.scrollToTop();
            Cookies.remove('summary');
            Cookies.remove('refine');
        }
        if(Cookies.get('textkey'))
        {
            Fetch(Main_Data);
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

    },[Main_Data,summary,refine]);

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
                    <h2>Sumarize text</h2>
                </div>
                <div className="chbx2">
                    <input type="checkbox" onChange={()=>HandleCheckboxChange(0)}/>
                    <h2>Refine Terms</h2>
                </div>
            </div>
            <div className="butns">
                <button className="buts" onClick={HandleLoader}>Process</button>
                <button className="butf" onClick={RemoveData}>New File</button>
            </div>
            {
                ResultFlag
                ?
                summary&&refine
                ?
                <div>
                    <Summarizr summaryData={responseData.summary}/>
                    <TermRefine terms={responseData.refined} />
                </div>
                :summary
                ?<Summarizr summaryData={responseData.summary}/>
                :<TermRefine terms={responseData.refined}/>
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
            IsError?<Prompt Display_Data={IsError}
            HandleError={HandleError}/>:null
        }
        </div>
    );
}

export default Services;
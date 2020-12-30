import React,{useRef,useEffect} from 'react';
import { gsap } from 'gsap';
import { Link, animateScroll as scroll } from 'react-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AiImage from '../../Images/AiImage/AiImg.jpg';
import NotesImage from '../../Images/notetaker/note.jpg';
import '../../Mainer.css';
import { TimelineMax,Linear } from 'gsap/gsap-core';

const Home = ({HandleChange,background}) => {
    gsap.registerPlugin(ScrollTrigger);

    const ref1=useRef(null);
    const ref2=useRef(null);
    const ref3=useRef(null);
    const ref4=useRef(null);
    const ref5=useRef(null);
    const ref6=useRef(null);
    const ref7=useRef(null);
    const ref8=useRef(null);
    const ref9=useRef(null);
    const ref10=useRef(null);
    const ref11=useRef(null);
    const ref12=useRef(null);
    const ref13=useRef(null);
    const ref14=useRef(null);
    const ref15=useRef(null);
    const ref16=useRef(null);
    const ref17=useRef(null);
    const ref18=useRef(null);

    useEffect(()=>{
        // const tl=new TimelineMax({repeat:-1});
        // tl.to(ref4.current,30,{
        //     backgroundPosition:"-2247px 0px",
        //     ease:Linear.easeNone
        // });
        // window.onscroll=()=>{
        //     if(window.pageYOffset === 0){
        //         return HandleChange('transparent');
        //     }
        //     if(background==='transparent'){
        //         return HandleChange('black');
        //     }
        // }

        window.onload=()=>{
            scroll.scrollToTop();
        }

        gsap.from(ref1.current,{
            scale:0.1,
            opacity:0,
            rotation:45,
            delay:1,
            ease:"power3",
            duration:1.2
        });
        gsap.from(ref2.current,{
            scale:0.1,
            opacity:0,
            rotation:90,
            delay:1.3,
            ease:"power3",
            duration:1.4
        });
        gsap.from(ref3.current,{
            scale:0.1,
            opacity:0,
            rotation:135,
            delay:1.6,
            ease:"power3",
            duration:1.6
        });
        gsap.from(ref4.current,{
            scale:0.1,
            opacity:0,
            rotation:180,
            delay:1.9,
            ease:"power3",
            duration:1.8
        });
        gsap.from(ref5.current,{
            x:-200,
            delay:3,
            duration:2,
            ease:"elastic",
            opacity:0
        });
        gsap.from(ref6.current,{
            x:200,
            delay:5,
            duration:2,
            ease:"elastic",
            opacity:0
        });
        gsap.from(ref7.current,{
            scrollTrigger:{
              trigger:ref7.current,
              toggleActions:"play none none none"  
            },
            x:-100,
            delay:1,
            duration:2,
            opacity:0,
            ease:"power3"
        });
        gsap.from(ref8.current,{
            scrollTrigger:{
              trigger:ref8.current,
              toggleActions:"play none none none"
            },
            x:-100,
            delay:2,
            duration:2,
            opacity:0,
            ease:"power3"
        });
        gsap.from(ref9.current,{
            scrollTrigger:{
                trigger:ref9.current,
                toggleActions:"play none none none"
            },
            scale:0.3,
            x:100,
            delay:1,
            duration:1,
            ease:"power3",
            opacity:0
        });
        gsap.from(ref10.current,{
            scrollTrigger:{
                trigger:ref10.current,
                toggleActions:"play none none none"
            },
            left:-3,
            delay:1,
            duration:1,
            ease:"power3"
        });
        gsap.from(ref11.current,{
            scrollTrigger:{
                trigger:ref11.current,
                toggleActions:"play none none none",
            },
            x:-500,
            delay:1,
            duration:1,
            ease:"power3",
            opacity:0
        });
        gsap.from(ref12.current,{
            scrollTrigger:{
                trigger:ref12.current,
                toggleActions:"play none none none",
            },
            x:-500,
            delay:1,
            duration:1,
            ease:"power3",
            opacity:0
        });
        gsap.from(ref13.current,{
            scrollTrigger:{
                trigger:ref13.current,
                toggleActions:"play none none none",
            },
            x:-500,
            delay:1,
            duration:1,
            ease:"power3",
            opacity:0
        });
        gsap.from(ref14.current,{
            scrollTrigger:{
                trigger:ref14.current,
                toggleActions:"play none none none"
            },
            scale:0.3,
            x:100,
            delay:1,
            duration:1,
            ease:"power3",
            opacity:0
        });
        gsap.from(ref15.current,{
            x:100,
            opacity:0,
            delay:3,
            ease:"power3",
            duration:1
        });
        gsap.from(ref16.current,{
            x:100,
            opacity:0,
            delay:3.3,
            ease:"power3",
            duration:1
        });
        gsap.from(ref17.current,{
            x:100,
            opacity:0,
            delay:3.6,
            ease:"power3",
            duration:1
        });
        gsap.from(ref18.current,{
            x:100,
            rotation:180,
            opacity:0,
            delay:3.9,
            ease:"power3",
            duration:1
        });
    },[ref1,ref2,ref3,ref4,ref5,ref6,ref7,ref8,ref9,ref10,ref11,ref12,ref13,ref14,ref15,ref16,ref17]);

    return (
        <div className="home">
        <div className="slide1">
            <div className="flex-header">
                    <div ref={ref1}>Welcome</div>
                    <div ref={ref2}>to</div>
                    <div ref={ref3}>the</div>
                <div className="title">
                    <div ref={ref4}>Summarizer</div>
                    <div ref={ref15}>.</div>
                    <div ref={ref16}>.</div>
                    <div ref={ref17}>.</div>
                    <div ref={ref18}>!</div>
                </div>
            </div>
            <h2 ref={ref5}>Long text & you're running out of time?</h2>
            <h2 ref={ref6}>Just give us your thing and take a Nice summary back!😎</h2>
        </div>
        <div className="slider">
        <div className="slide2">
            <h1 ref={ref7}>Well, Who thought AI could ease your homework or could do it for you?</h1>
            <h2 ref={ref8}>
                But here we are summarizing your text so that you could get an 
                applause in your class.We guarantee that we'll ease your work like hell!
                It's super simple just give us the text you want to summarize and then leave everything
                to your <span>"BEST FRIEND"</span> A.I to reduce it to for ya!
            </h2>
        </div>
        <img src={AiImage} alt="$" ref={ref9}/>
        </div>
        <div className="slider1">
        <div className="slide3">
            <h1 ref={ref12}>It really takes a lot of effort to comprehend a passage with hordes of terminologies.</h1>
            <h2 ref={ref13}>
                There are times when you're reading a nice passage with a lot of mind baffling terminologies
                which really affects your productivity but not for long because we've got you in this too!
                Just give us your passage and your <span>"BEST FRIEND"</span> A.I will highlight
                important terminologies with their links for you to read about them. So,get ready to take 
                your productivity to next level.
            </h2>
            <button onClick={()=>window.location.href='/services'}>Show me</button>
        </div>
        <img src={NotesImage} alt="$" ref={ref14}/>
        </div>
        </div>
    );
}

export default Home;
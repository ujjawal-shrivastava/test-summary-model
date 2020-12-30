import React,{useEffect,useRef} from 'react';
import { gsap } from 'gsap';
import { useMediaQuery } from 'react-responsive';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Logo from '../../Images/Logo.png';
import HamMenu from '../HamMenu/HamMenu';
import { Link } from 'react-router-dom';

const Menu = ({background}) => {

    gsap.registerPlugin(ScrollTrigger);

    const IsWidthReduced=useMediaQuery({
        query:'(min-width: 750px)'
    });

    const Mainmenu=useRef(null);
    const bar1=useRef(null);
    const bar2=useRef(null);
    const bar3=useRef(null);
    const bar4=useRef(null);
    
    useEffect(()=>{
        gsap.to(Mainmenu.current,{
            scrollTrigger:{
                trigger:Mainmenu.current,
                toggleActions:"pause play reverse restart"
            },
            background:"linear-gradient(147deg, #000000 0%, #2c3e50 74%)",
            delay:0,
            duration:1,
            boxShadow:"4px 4px 4px black",
            ease:"power3"
        });
    },[Mainmenu]);

    const EnterHover=(bar,wd)=>{
        gsap.to(bar.current,{
            // width:wd,
            scaleX:1,
            opacity:1,
            delay:0,
            duration:0.5,
            transformOrigin:"left left"
        });
    }

    const LeaveHover=(bar)=>{
        gsap.to(bar.current,{
            scaleX:0,
            opacity:0,
            transformOrigin:"right right",
            delay:0,
            duration:0.5
        });
    }

    return (
        IsWidthReduced
        ?(<div className="menu" ref={Mainmenu}>
            <img src={Logo} alt="Logo"/>
            <Link to='/' style={{textDecoration:"none",color:"white",margin:"3%"}}>
                <h3 className='m1' 
                onMouseEnter={()=>{EnterHover(bar1,65)}}
                onMouseLeave={()=>{LeaveHover(bar1)}}>Home<div ref={bar1}></div></h3>
            </Link>
            <Link to='/services' style={{textDecoration:"none",color:"white",margin:"3%"}}>
                <h3 className='m2' 
                onMouseEnter={()=>{EnterHover(bar2,120)}}
                onMouseLeave={()=>{LeaveHover(bar2)}}>Services<div ref={bar2}></div></h3>
            </Link>
            <Link to='about' style={{textDecoration:"none",color:"white",margin:"3%"}}>
                <h3 className='m4' 
                onMouseEnter={()=>{EnterHover(bar4,80)}}
                onMouseLeave={()=>{LeaveHover(bar4)}}>About<div ref={bar4}></div></h3>
            </Link>
        </div>)
        :<HamMenu/>
    )
}

export default Menu;
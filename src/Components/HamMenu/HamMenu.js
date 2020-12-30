import React,{useRef,useState} from 'react';
import './HamMenu.css';
import Logo from '../../Images/Logo.png';
import {Link} from 'react-router-dom';
import {gsap} from 'gsap';
import {ScrollTrigger} from 'gsap/ScrollTrigger';

const HamMenu = ({changeBackground}) => {

    gsap.registerPlugin(ScrollTrigger);

    const [toggle,toggler]=useState(false);

    const bar1=useRef(null);
    const bar2=useRef(null);
    const bar3=useRef(null);
    const hamM=useRef(null);
    const mainer=useRef(null);

    const HandleToggleHam=()=>{
        toggler(!toggle);
        HamMenuTrigger();
    }

    const HamMenuTrigger=()=>{
        if(!toggle)
        {
            gsap.to(bar1.current,{
                rotate:45,
                y:10,
                ease:"power3"
            });
            gsap.to(bar2.current,{
                opacity:0,
                ease:"power3"
            });
            gsap.to(bar3.current,{
                y:-15,
                rotate:-45,
                ease:"power3"
            });
        }
        else
        {
            gsap.to(bar1.current,{
                rotate:0,
                y:0,
                ease:"power3"
            });
            gsap.to(bar2.current,{
                opacity:1,
                ease:"power3"
            });
            gsap.to(bar3.current,{
                y:0,
                rotate:0,
                ease:"power3"
            });
        }
    }

    return (
            <div className="Ham-menu" ref={mainer} style={{background:toggle
            ?'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)':'transparent',
            transition:'1s'}}>
                    <div className="hambr" onClick={HandleToggleHam}>
                        <div id='bar1' ref={bar1}></div>
                        <div id='bar2' ref={bar2}></div>
                        <div id='bar3' ref={bar3}></div>
                    </div>
                    <div className='mn' ref={hamM} style={{
                        visibility:toggle?'visible':'hidden',
                        pointerEvents:toggle?'all':'none'
                    }}>
                        <img src={Logo} alt="logo" />
                        <Link to="/" style={{textDecoration:"none",color:"white"}}>
                            <h2 className='hd1' onClick={HandleToggleHam}>Home</h2>
                        </Link>
                        <Link to="/services" style={{textDecoration:"none",color:"white"}}>
                            <h2 className='hd2' onClick={HandleToggleHam}>Services</h2>
                        </Link>
                        <Link to="/about" style={{textDecoration:"none",color:"white"}}>
                            <h2 className='hd3' onClick={HandleToggleHam}>About</h2>
                        </Link>
                    </div>
            </div>
    );
}
export default HamMenu;
import React,{useRef,useEffect} from 'react';
import coders from '../../Images/Coders/coders.jpg';
import { gsap } from 'gsap/all';
import { animateScroll as scroll } from 'react-scroll';

const About = () => {

    const lk1=useRef(null);
    const lk2=useRef(null);
    const lk3=useRef(null);

    useEffect(()=>{

        window.onload=()=>{
            scroll.scrollToTop();
        }

        gsap.from(lk1.current,{
            scale:0,
            x:-100,
            delay:1,
            duration:1,
            opacity:0
        });
        gsap.from(lk2.current,{
            x:100,
            delay:1,
            duration:1,
            opacity:0
        });
        gsap.from(lk3.current,{
            x:10,
            delay:2,
            duration:1,
            opacity:0
        });
    },[lk1,lk2,lk3])

    return (
        <div className="about-parent">
            <div className="about">
                <img src={coders} alt="team" ref={lk1}/>
                <div className="abt-sec">
                    <h1 ref={lk2}>We're the Coding Ultras...</h1>
                    <h2 ref={lk3}>
                        Well,It's blabbering time 😆.Never mind, since this is an about us page so here we go...
                        Okay,so we're just buncha Computer Science enthusiasts who're almost
                        always looking forward to ease people's lives via mind baffling technologies
                        and also to drinking nice coffee. Umm... and Yeah that was us in a nutshell.
                        One more thing, just so you know that we really love working with latest technologies
                        and experimenting with them obviously.
                    </h2>
                </div>
            </div>
            <div className="refns">
                <h1>References</h1>
                <h2>
                    Here's the list of the resources we've used in this project,Check
                    them out!
                </h2>
                <ul>
                    <li><span>The super-cool background:</span><span><a href="http://www.freepik.com">Designed by rawpixel.com / Freepik</a></span></li>
                    <li><span>Image Number-1(used in home page):</span><span><a href="http://www.freepik.com">Designed by vectorjuice / Freepik</a></span></li>
                    <li><span>Image Number-2(used in home page):</span><span><a href="http://www.freepik.com">Designed by slidesgo / Freepik</a></span></li>
                    <li><span>Image Number-3(used in about page):</span><span><a href="http://www.freepik.com">Designed by Freepik</a></span></li>
                </ul>
            </div>
        </div>
    );
}

export default About;
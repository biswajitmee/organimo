import React, {useLayoutEffect, useRef} from 'react';

import {gsap} from "gsap";
import {ScrollTrigger} from "gsap/ScrollTrigger";
import {ScrollSmoother} from 'gsap/ScrollSmoother';

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

import ScrollSection from './ScrollSection';

function App() {

    const main = useRef();
    const smoother = useRef();

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // create the smooth scroller FIRST!
            smoother.current = ScrollSmoother.create({
                smooth: 5, // seconds it takes to "catch up" to native scroll position
                effects: true, // look for data-speed and data-lag attributes on elements and animate accordingly
            });

        }, main);
        return () => ctx.revert();
    }, []);

    return (     
   
    
    <div id="smooth-wrapper" ref={main}>
        <div id="smooth-content">
            <div className="mainScroll">
                <ScrollSection/>
            </div>
        </div>
    </div>       
  );
}

export default App;
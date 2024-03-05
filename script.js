function show(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

// show();

// window.addEventListener("mousemove",dets=>{
//     gsap.to("#custom-cursor",{
//         x:dets.clientX,
//         y:dets.clientY,
//     })
// })

function mouseFollow(xscale,yscale){
    window.addEventListener("mousemove",function(dets){
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(${xscale},${yscale})`;
    })
}
mouseFollow();

var timeOut;

function mouseChaptaKaro(){
    var xscale = 1;
    var yscale = 1;

    var xprev = 0;
    var yprev = 0;

    window.addEventListener("mousemove",(dets)=>{
        clearTimeout(timeOut);
        
        var xscale = gsap.utils.clamp(.6,1,dets.clientX-xprev);
        var yscale = gsap.utils.clamp(.6,1,dets.clientY-yprev);

        xprev = dets.clientX;
        yprev = dets.clientY;

        mouseFollow(xscale,yscale);

        timeOut = setTimeout(function(){
        document.querySelector("#cursor").style.transform = `translate(${dets.clientX}px,${dets.clientY}px) scale(1,1)`;
        },100);
    });
}
mouseChaptaKaro();

function second(){
    var tl2 = gsap.timeline({
        scrollTrigger:{
            trigger: "#two",
            scrub: 1,
            start: "top 90%",
            // end: "bottom 65%",
            end: "+=" + (window.innerHeight * 2),
            // markers: true
        }
    })
    tl2
    .to(".card",{
        transform: "translateX(-50%)",
        ease: Expo.easeInOut
    }, "same")
    .to(".card2",{
        transform: "translateX(-30%)",
        ease: Expo.easeInOut
    }, "same")
}
second()

function third(){
    var tl3 = gsap.timeline({
        scrollTrigger:{
            trigger: "#three",
            markers: true,
            // start: "top 90%",
            scrub: 1,
            end: "+=" + (window.innerHeight * 2),
            pin:true,
        }
    })
    
    tl3
    .to(".row",{
        opacity: 1,
        stagger: .025,
        ease: Power0
    }, "same")
    .to(".row h3",{
        // transform: "rotateY(0deg) scale(1)",
        // marginRight: "10px"
        fontSize: "2.8vw",
        ease: Power0
    }, "same")
    .to("#four",{
        top:"-70vh",
        delay: -.5,
    })
}
third()


var tl4 = gsap.timeline({
    scrollTrigger:{
        trigger: "#page7",
        pin: true,
        scrub: 1,
        // markers: true,
        start: "top 0%",
        end: "bottom 56%",
        scroller: "body"
    }
})

tl4
.to("#page7-1",{
    top: "0%"
}, "same")
.to("#left h2",{
    y: -300,
}, "same")
.to("#right h2",{
    y: -300
}, "same")


gsap.to("crd-holder-2",{
    scrollTrigger:{
        trigger:".w1",
        start:"top top",
        pin:true,
        scrub:3,
    },
    top:"-100%",
})
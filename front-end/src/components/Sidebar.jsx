import {useEffect,useState,useRef} from "react";
import style from "../style/Sidebar.module.css";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import { RecipeList } from "./RecipeList.jsx";

gsap.registerPlugin(useGSAP);


export function Sidebar({refreshTrigger, dispatch})
{
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const overlayRef=useRef();
  const sidebarRef=useRef();;
  const t1=useRef();
  const t2=useRef();
    
   

  const {contextSafe}= useGSAP(()=>{
      t1.current=gsap.timeline({paused:true})
      .to(sidebarRef.current,{
        scaleX:1,
        duration:1,
        ease:"bounce.out"
      })
      .to(overlayRef.current,{
        scaleX:1,
        duration:1,
        ease:"bounce.out"
      },"<");


      t2.current=gsap.timeline({paused:true})
      .to(sidebarRef.current,{
        scaleX:0,
        duration:1,
        ease:"bounce.out"
      })
      .to(overlayRef.current,{
        scaleX:0,
        duration:1,
        ease:"bounce.out"
      },"<");
  });
  


  
const handleSideBarShow=contextSafe(()=>{
    setIsSidebarOpen(true);
  t1.current.restart(); 
});
const handleSideBarHide=contextSafe(()=>{ 
  setIsSidebarOpen(false);
  t2.current.restart();
});



    return (
        <>
        <div className={style.navbarButton} onClick={handleSideBarShow}>
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="50" fill="#67C2D4" />
            </svg>
        </div>
        <div className={style.overlay} ref={overlayRef} onClick={handleSideBarHide}></div>

        <div className={style.sidebar} ref={sidebarRef}>  
          <RecipeList dispatch={dispatch} refreshTrigger={refreshTrigger} isSidebarOpen={isSidebarOpen}  />
        </div>
        </>

    )
}
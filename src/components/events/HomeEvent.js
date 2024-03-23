import { useLoaderData } from "react-router-dom";

//import Events from "../Events/Events";
import AboutFea from "./AboutFea/AboutFea";

//import Schedule from "./../Events/Schedule";
import Banner from "./Banners/Banner";
 
import Spornsor from "./Sponsers/Spornsors";
import Events from "./Events";
 
const HomeEvent = () => {
  
 
  
  return (
    <div>
    
      <div className="md:mb-40">
        <Banner />
      </div>
   
      <div data-aos="fade-right">
        <AboutFea />
      </div>
      <div data-aos="fade-right">
        <Events />
      </div>
     
      <Spornsor />
    </div>
  );
};

export default HomeEvent;
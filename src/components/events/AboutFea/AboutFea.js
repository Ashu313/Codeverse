import gifOne from "../../../asset/main-macaron-1_A.gif";
import gifTwo from "../../../asset/main-macaron-2_A.gif";

const AboutFea = () => {
  return (
    <div className=" text-rose-400 text-center">
      <img
        className="w-52 md:absolute md:-bottom-60 sticky z-60 left-60 mx-auto"
        
        alt=""
      />
      <img
        className="w-52 md:absolute right-48 sticky  md:dis -bottom-96 mx-auto"
       
        alt=""
      />
      <h2 className="md:text-9xl text-4xl font-semibold"> Welcome to Prep&Perform</h2>

      <p className="text-lg font-light md:w-2/4 text-center mx-auto  mt-5">
        Explore the future of what is possible at TecH.e Join developers,
        creators, and designers to learn the latest tech, connect with experts,
        and get inspired.
      </p>
    </div>
  );
};

export default AboutFea;
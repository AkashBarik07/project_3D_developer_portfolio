import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, Feedbacks, Hero, Navbar, Tech, Works, StarsCanvas } from "./components";
import CustomCursor from "./components/CustomCursor";
import GithubActivity from "./components/GithubActivity";

const App = () => {
  return (
    <BrowserRouter>
      <CustomCursor/>
      <div className="relative z-0 bg-primary">
        <StarsCanvas />
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <GithubActivity username="AkashBarik07"/>
        {/* <Feedbacks /> */}
          {/* <Contact /> */}
        {/* <div className="relative z-0"> */}
          <Contact />
          {/* <StarsCanvas /> */}
        {/* </div> */}
      </div>
    </BrowserRouter>
  );
}

export default App;

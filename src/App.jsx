import { Routes, Route } from "react-router-dom";

import Footer from "./pages/Footer";
import HeroVideo from "./pages/HeroVideo";
import Navbar from "./components/Navbar";
import PhotoUpload from "./pages/PhotoUpload";
import VideoShowcase from "./pages/VideoShowcase";
import AboutUs from "./pages/AboutUs";
import Enquiry from "./pages/Enquiry";
import Body from "./pages/Body";
import PhotoGrid from "./pages/PhotoGrid";
import EventGallery from "./pages/EventGallery";
import ViewEnquiries from "./pages/ViewEnquiries";
function Home() {
  return (
    <>
      <HeroVideo />
      <VideoShowcase />
      {/* <PortfolioCards /> */}
      <Footer />
    </>
  );
}
function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<PhotoUpload />} />
        <Route path="/AboutUs" element={<AboutUs />} />
        <Route path="/Enquiry" element={<Enquiry />} />
        <Route path="/Body" element={<Body />} />
        <Route path="/PhotoGrid" element={<PhotoGrid />} />
        <Route path="/EventGallery/event/:id" element={<EventGallery />} />
        <Route path="/ViewEnquiries" element={<ViewEnquiries />} />
      </Routes>
    </>
  );
}

export default App;

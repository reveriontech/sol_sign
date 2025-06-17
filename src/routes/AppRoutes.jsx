import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageLoader from "../components/PageLoader";

// For pages
const Intro = React.lazy(() => import("../pages/Intro"));
const Landing = React.lazy(() => import("../pages/Landing"));
const UploadPage = React.lazy(() => import("../pages/UploadPage"));
const Home = React.lazy(() => import("../pages/Home"));
// import SmartSignature from "../pages/SmartSignature";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* For Intro page - this will be the initial route */}
          <Route path="/" element={<Intro />} />

          {/* Home layout with nested routes */}
          <Route path="/home" element={<Home />}>
            <Route index element={<Landing />} />
            <Route path="landing" element={<Landing />} />
            <Route path="upload" element={<UploadPage />} />
          </Route>
          
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

export default AppRoutes;

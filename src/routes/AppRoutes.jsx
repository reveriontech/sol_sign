import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageLoader from "../components/PageLoader";

// For pages
const Intro = React.lazy(() => import("../pages/Intro"));
const Landing = React.lazy(() => import("../pages/Landing"));
const UploadPage = React.lazy(() => import("../pages/UploadPage"));
// import SmartSignature from "../pages/SmartSignature";

const AppRoutes = () => {
  return (
    <BrowserRouter>

      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* For Intro page */}
          <Route
            path="/"
            element={<Intro />}
          />

          {/* Landing page */}
          <Route
            path="/landing"
            element={<HomeProvider><Landing /></HomeProvider>}
          />
              
          {/* Landing page */}
               <Route
                path="/rafce"
                element={<HomeProvider><UploadPage /></HomeProvider>}
              />
              
          {/* Upload page */}
              <Route
                path="/upload"
                element={<HomeProvider><UploadPage /></HomeProvider>}
              />
          
        </Routes>
      </Suspense>
      
    </BrowserRouter>
  );
};

export default AppRoutes;

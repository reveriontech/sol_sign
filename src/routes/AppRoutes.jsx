import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { SessionProvider } from "./SessionProvider";
import AccessProvider from "./AccessProvider";
import HomeProvider from "./HomeProvider";

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

          {/* For Intro page */}
          <Route
            path="/"
            element={<Intro />}
          />

          {/* Landing page */}
          <Route
            path="/landing"
            element={<Landing />}
          />

            {/* Landing page */}
              <Route
                path="/landing"
                element={<Landing />}
              />
              
          {/* Landing page */}
               <Route
                path="/rafce"
                element={<UploadPage />}
              />
              
          {/* Upload page */}
              <Route
                path="/upload"
                element={<UploadPage />}
              />
          
        </Routes>
      </Suspense>
      
    </BrowserRouter>
  );
};

export default AppRoutes;

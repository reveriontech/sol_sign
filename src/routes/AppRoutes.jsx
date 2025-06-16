import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageLoader from "../components/PageLoader";

// For pages
const Intro = React.lazy(() => import("../pages/Intro"));
const Landing = React.lazy(() => import("../pages/Landing"));

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
          
        </Routes>
      </Suspense>
      
    </BrowserRouter>
  );
};

export default AppRoutes;

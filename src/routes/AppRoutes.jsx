import React, { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import PageLoader from "../components/PageLoader";
import { SessionProvider } from "./SessionProvider";
import AccessProvider from "./AccessProvider";
import HomeProvider from "./HomeProvider";

// For pages
const Intro = React.lazy(() => import("../pages/Intro"));
const Landing = React.lazy(() => import("../pages/Landing"));

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <SessionProvider>

      <Suspense fallback={<PageLoader />}>
        <Routes>

          {/* For Intro page */}
          <Route
            path="/"
            element={<AccessProvider><Intro /></AccessProvider>}
          />

          {/* Landing page */}
          <Route
            path="/landing"
            element={<HomeProvider><Landing /></HomeProvider>}
          />
          
        </Routes>
      </Suspense>
      </SessionProvider>
    </BrowserRouter>
  );
};

export default AppRoutes;

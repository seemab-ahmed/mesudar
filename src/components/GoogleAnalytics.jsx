// GoogleAnalytics.jsx
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactGA from "react-ga4";

// const TRACKING_ID = "G-NNDN1F31VQ"; // replace with your actual Measurement ID
const TRACKING_ID = "G-2PZVDSJ5RZ";
ReactGA.initialize(TRACKING_ID);

const GoogleAnalytics = () => {
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;

    // Only track non-admin pages
    if (!path.startsWith("/admin")) {
      ReactGA.send({
        hitType: "pageview",
        page: path + location.search,
      });
    }
  }, [location]);

  return null;
};

export default GoogleAnalytics;




// // GoogleAnalytics.jsx
// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import ReactGA from "react-ga4";

// const TRACKING_ID = "G-XXXXXXXXXX"; // replace with your Measurement ID

// ReactGA.initialize(TRACKING_ID);

// const GoogleAnalytics = () => {
//   const location = useLocation();

//   useEffect(() => {
//     ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
//   }, [location]);

//   return null;
// };

// export default GoogleAnalytics;

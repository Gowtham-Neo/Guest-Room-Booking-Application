import React from "react";
import { createBrowserRouter ,Navigate} from "react-router-dom";
import Home from "../pages/Home";
import Guest from "../pages/Guest/Guest";
import HouseDetails from "../pages/Guest/HouseDetials";
import Dashboard from "../pages/HouseOwner/Dashboard";
import Portfolio from "../pages/HouseOwner/Portfolio";
import RoomDetailView from "../pages/HouseOwner/Room/RoomDetailView";
import HoSigninForm from "../pages/Signin/HoSigninForm"
import HoSignupForm from "../pages/Signup/HoSignupForm";
import CuSigninForm from"../pages/Signin/CuSigninForm"
import CuSignupForm from "../pages/Signup/CuSignupForm";
import HouseDetailView from "../pages/HouseOwner/House/HouseDetailView";
import Logout from "../pages/Logout";

import BookingPage from "../pages/Booking/BookingPage";
import BookingDetils from "../pages/Booking/BookingDetails";
// const Logout = React.lazy(() => import("../pages/Logout"));
// const ChangePassword = React.lazy(() => import("../pages/ChangePassword"));
import NotFoundPage from "../pages/NotFoundPage";

const router = createBrowserRouter([
  { path: "/", element: <Navigate to="/guestify" replace /> },
  {
    path: "/guestify",  
    element: <Home/>
  },
  {
    path: "/booking",  
    element: <Guest/>,
  },
  {
    path: "/booking/guest/:guestId",  
    element: <BookingDetils/>,
  },
  {
    path:"/booking/houseDetials/:houseId",
    element: <HouseDetails/>
  },
  {
    path:"/booking/room/:roomId",
    element: <BookingPage/>
  },
  
  {
    path: "/Ho/Dashboard",  
    element: <Dashboard/>
  },
  {
    path: "/Ho/portfolio",  
    element: <Portfolio/>
  },
  {
    path: "/houseview/:houseId",  
    element: <HouseDetailView/>
  },
  {
    path: "/house/:houseId/room/:roomId",  
    element: <RoomDetailView/>
  },
  {
    path: "/Ho/login",
    element: <HoSigninForm />
  },
  {
    path: "/Ho/signup",
    element: <HoSignupForm />
  },
  {
    path: "/Cu/login",
    element: <CuSigninForm />
  },
  {
    path: "/Cu/signup",
    element: <CuSignupForm />
  },
  {
    path: "/logout",
    element: <Logout />
  },
//   {
//     path: "/change-password",
//     element: <ChangePassword />
//   },
  {
    path: "*",
    element: <NotFoundPage />
  },
  
]);
export default router;
import { createBrowserRouter } from "react-router-dom";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import Addwater_intake from "./Water_intake/Addwater_intake";
import Listwater_intake from "./Water_intake/Listwater_intake";
import Editwater_intake from "./Water_intake/Editwater_intake";
import WaterIntakeDifference from "./Water_intake/Water_intake_Difference";



const router = createBrowserRouter([
    { path: '', element: <Register/> },
    { path: '/login', element: <Login/> },
    { path: '/addwater_intake', element: <Addwater_intake/> },
    { path: '/listwater_intake', element: <Listwater_intake/> },
    {path:"/editwater_intake/:id", element:<Editwater_intake />},
    {path:"/differwater_intake", element:<WaterIntakeDifference/>}

]);

export default router;
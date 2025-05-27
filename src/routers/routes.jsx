import { createBrowserRouter } from "react-router-dom";
import Main from "../pages/main";
import Home from "../pages/home";
import PatientForm from "../components/patientForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <PatientForm />,
      },
      {
        path: "/patients",
        element: <Home />,
      },
    ],
  },
]);
export default router;

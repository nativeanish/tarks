import Index from "../pages/Index";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import OnBoard from "../pages/OnBoard";
import { useEffect } from "react";
import useAddress from "../store/useAddress";
import Theme from "../pages/Theme";
const Check = () => {
  const navigate = useNavigate();
  const address = useAddress((state) => state.address);
  useEffect(() => {
    window.addEventListener("arweaveWalletLoaded", () => {
      if (!address) {
        navigate("/");
      }
      window.arweaveWallet.getActiveAddress().then((address) => {
        if (!address) {
          navigate("/");
        }
      });
    });
  }, []);
  return null;
};
const router = createBrowserRouter([
  {
    path: "*",
    element: <Check />,
  },
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/onboard",
    element: <OnBoard />,
  },
  {
    path: "/theme",
    element: <Theme />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;

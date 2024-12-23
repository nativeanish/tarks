import Index from "../pages/Index";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import OnBoard from "../pages/OnBoard";
import Theme from "../pages/Theme";
import Editor from "../pages/Editor";
import NotFound from "../pages/NotFound";
import Publish from "../pages/Publish";
const router = createBrowserRouter([
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
  {
    path: "/editor",
    element: <Editor />,
  },
  {
    path: "/publish",
    element: <Publish />,
  },
  {
    path: "*",
    element: <NotFound />,
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

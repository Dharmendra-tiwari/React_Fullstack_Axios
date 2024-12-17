import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Posts } from "./components/Posts";
import { AppLayout } from "./components/AppLayout";
import { About } from "./components/About";
import { Contact } from "./components/Contact";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppLayout />,

      children: [
        {
          path: "/",
          element: <Posts />,
        },
        {
          path: '/about',
          element: <About />
        },
        {
          path: '/contact',
          element: <Contact />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};
export default App;

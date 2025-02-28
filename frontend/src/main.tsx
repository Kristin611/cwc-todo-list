// import { StrictMode } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ReactDOM from "react-dom/client";
// import './index.css';
import App from './App.tsx';
import { Provider } from "@/components/ui/provider";
import SignUp from "./Pages/SignUp";
import LogIn from "./Pages/LogIn";

const router = createBrowserRouter([
  {
      path: "/",
      element: <App />,
      errorElement: <p>this is not working</p>,
      children: [
          {
              path: "/sign-up",
              element: <SignUp />
          },
          {
              path: "/log-in",
              element: <LogIn />
          }
      ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <Provider>
        <RouterProvider router={router}/>
    </Provider>
)

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import UserInfoForm from "./pages/UserInfo/UserInfoForm.tsx";
import DataPage from "./pages/Data/DataPage.tsx";
import ContextProvider from "./provider/ContextProvider.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        path: "/",
        element: <UserInfoForm></UserInfoForm>,
      },
      {
        path: "/data",
        element: <DataPage></DataPage>,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </React.StrictMode>
);

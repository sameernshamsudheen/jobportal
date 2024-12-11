import { RouterProvider } from "react-router-dom";
import router from "../router/router";
import { Suspense } from "react";

function App() {
  return <RouterProvider router={router} />;
}

export default App;

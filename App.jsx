import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login, Search } from "./pages";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  { path: "/Login",
    element: <Login />
},
  {
    path: '/search',
    element: <Search />,
  },
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;

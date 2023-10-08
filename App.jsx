<<<<<<< HEAD
import React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home, Login } from "./pages";
=======
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Home, Search } from './pages';
>>>>>>> fb69ce434f939de16f50a3f279d4a462cf83f51b

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
<<<<<<< HEAD
  { path: "/Login",
    element: <Login />
}
=======
  {
    path: '/search',
    element: <Search />,
  },
>>>>>>> fb69ce434f939de16f50a3f279d4a462cf83f51b
]);

function App() {
  return (
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
}

export default App;

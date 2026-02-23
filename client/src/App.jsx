import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import { 
  CompressTool, ResizeTool, CropTool, 
  ConvertTool, RotateTool, RemoveBgTool 
} from './pages/Tools';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/compress',
    element: <CompressTool />,
  },
  {
    path: '/resize',
    element: <ResizeTool />,
  },
  {
    path: '/crop',
    element: <CropTool />,
  },
  {
    path: '/convert',
    element: <ConvertTool />,
  },
  {
    path: '/rotate',
    element: <RotateTool />,
  },
  {
    path: '/remove-bg',
    element: <RemoveBgTool />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;

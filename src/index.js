import React from 'react';
import ReactDOM from 'react-dom';
import { 
    createBrowserRouter,
    RouterProvider,
    BrowserRouter
 } from 'react-router-dom';
import App from './App'; // Import your App component
import './index.css'; // Import your CSS if needed

const router = createBrowserRouter([
    {
        path: "/",
        element: <div>Hello World! </div>
    }
])

ReactDOM.render(
    <BrowserRouter>
        <App /> 
    </BrowserRouter>,
    document.getElementById('root')
);

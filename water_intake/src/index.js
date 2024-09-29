// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebvitals from './reportWebVitals';
import {RouterProvider } from 'react-router-dom';
import router from './router';

import {Provider} from 'react-redux';
import {store} from './store/store';// Adjust the path as necessary


const root =ReactDOM.createRoot(document.getElementById('root'));
     root.render(
           <React.StrictMode>
                <Provider store={store}>
      
        <RouterProvider router={router}/>
      
    </Provider>
              </React.StrictMode>
            );
reportWebvitals();

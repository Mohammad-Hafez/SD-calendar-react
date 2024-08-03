import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { LanguageProvider } from "./Context/LanguageContext";
import { BrowserRouter } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { ConfigProvider } from "antd";
import { SlotProvider } from './Context/SlotContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <LanguageProvider>
    <BrowserRouter>
      <ConfigProvider>
        <SlotProvider>
          <App />
          <Analytics />
        </SlotProvider>
      </ConfigProvider>
    </BrowserRouter>
  </LanguageProvider>
);

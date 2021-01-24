import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from './App';
import ruRU from 'antd/lib/locale/ru_RU';
import 'antd/dist/antd.css';
import './models/models-init';
import { ConfigProvider } from 'antd';

const renderTarget = document.getElementById("app");
render(
    <ConfigProvider locale={ruRU}>
        <Router>
            <App />
        </Router>
    </ConfigProvider>,
    renderTarget
);

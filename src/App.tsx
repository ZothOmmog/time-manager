import { useGate } from "effector-react";
import React from "react";
import { AppGate } from "./models/app/app-model";
import { Routes } from "./pages/routes";

export const App: React.FC = () => {
    useGate(AppGate);
    return <Routes />;
};

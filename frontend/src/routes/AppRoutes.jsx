import { Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";
import DashboardSwitcher from "../pages/DashboardSwitcher";
import Times from "../pages/Times";
import Jogadores from "../pages/Jogadores";
import Torneios from "../pages/Torneios";

export default function AppRoutes() {
    return (
        <Routes>
            {/* /-/-/ Rotas públicas /-/-/ */}
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />

            {/* /-/-/ Rotas privadas — qualquer usuário logado /-/-/ */}
            <Route path="/" element={
                <PrivateRoute><DashboardSwitcher /></PrivateRoute>
            } />

            {/* /-/-/ Rotas privadas — acessível por ORG e Organizador /-/-/ */}
            <Route path="/times" element={
                <PrivateRoute><Times /></PrivateRoute>
            } />
            <Route path="/jogadores" element={
                <PrivateRoute papelNecessario="org"><Jogadores /></PrivateRoute>
            } />

            {/* /-/-/ Rotas privadas — apenas Organizador /-/-/ */}
            <Route path="/torneios" element={
                <PrivateRoute papelNecessario="organizador"><Torneios /></PrivateRoute>
            } />
        </Routes>
    );
}

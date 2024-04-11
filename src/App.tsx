import { 
    Refine,
    GitHubBanner, 
    WelcomePage,
    Authenticated,
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";

import {authProvider, dataProvider, liveProvider } from './providers';
import { Home, ForgotPassword, Login, Register } from "./pages";


import routerBindings, { CatchAllNavigate, DocumentTitleHandler, UnsavedChangesNotifier,} from '@refinedev/react-router-v6';
import { App as AntdApp } from "antd"
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import Layout from './components/layout';



// const API_URL = "https://api.nestjs-query.refine.dev/graphql";
// const WS_URL = "wss://api.nestjs-query.refine.dev/graphql";



function App() {
    return (
        <BrowserRouter>
        <GitHubBanner />
        <RefineKbarProvider>
<AntdApp>
            <DevtoolsProvider>
                <Refine 
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider} 
                    options={{
                        syncWithLocation: true,
                        warnWhenUnsavedChanges: true,
                        useNewQueryKeys: true,
                            projectId: "F7ORyL-ksAdsz-k6cym7",
                        liveMode: "auto",
                    }}
                >


                        <Routes>
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/forgotpassword' element={<ForgotPassword />} />
                            <Route
                            element={
                            <Authenticated 
                                key="authenticated-layout"
                                fallback={<CatchAllNavigate to="login" />}
                            >
                                <Layout> 
                                    <Outlet />
                                </Layout>
                            </Authenticated>
                            }>
                            <Route index element={<Home />} />

                            </Route>
                        </Routes>
                    <RefineKbar />
                    <UnsavedChangesNotifier />
                    <DocumentTitleHandler />
                </Refine>
            <DevtoolsPanel />
            </DevtoolsProvider>
            </AntdApp>
        </RefineKbarProvider>
        </BrowserRouter>
);
}

export default App;

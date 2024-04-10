import { 
    Refine,
    GitHubBanner, 
    WelcomePage,
} from '@refinedev/core';
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import { useNotificationProvider} from '@refinedev/antd';
import "@refinedev/antd/dist/reset.css";

import {authProvider, dataProvider, liveProvider } from './providers';
import { Home, ForgotPassword, Login, Register } from "./pages";


import routerBindings, { DocumentTitleHandler, UnsavedChangesNotifier,} from '@refinedev/react-router-v6';
import { App as AntdApp } from "antd"
import { BrowserRouter, Route, Routes } from "react-router-dom";



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
                            <Route index element={<WelcomePage />} />
                            <Route index element={<Home />} />
                            <Route path='/register' element={<Register />} />
                            <Route path='/login' element={<Login />} />
                            <Route path='/forgotpassword' element={<ForgotPassword />} />
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

/* eslint-disable */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";
import { AuthProvider } from "./context/AuthContext";

import NavBar from "./components/Navbar"
import HomePage from "./pages/HomePage"
import DashboardPage from "./pages/DashboardPage"
import BleDevicePage from "./pages/BleDevicePage"
import DistancePage from "./pages/DistancePage"
import SettingsPage from "./pages/SettingsPage"
import LoginPage from "./pages/LoginPage"
import TestGroupPage from "./pages/TestGroupsPage"
import WebsocketRoutes from "./utils/WebsocketRoutes"
import TestPage from "./pages/TestPage";
import TestTable from "./components/TestsTable"
import TestGroupsTable from "./components/TestGroupsTable";
import TestGroupAddForm from "./components/TestGroupAddForm";
import TestStartForm from "./components/TestStartForm";
import TestRunning from "./components/TestRunning";
import DistanceMeasurements from "./components/BleDevices/DistanceMeasurements";
import TestReviewPage from "./pages/TestReviewPage";
import BleDevices from "./components/BleDevices"
import AddBleDeviceForm from "./components/Forms/AddBleDeviceForm"
import DeviceOverview from "./components/DeviceOverview";
import Calibration from "./components/Calibration";



function App() {
    return (
        <div className="App font-body font-normal leading-normal text-gray-800 text-sm md:font-base md:leading-relaxed">
            <BrowserRouter>
                <AuthProvider>
                    <header className="">
                        <NavBar />
                    </header>
                    <div className="container">
                        <Routes>
                            <Route element={<HomePage />} path="/" exact />
                            <Route element={<LoginPage />} path="/login" />
                            <Route element={<PrivateRoutes />}>
                                <Route element={<WebsocketRoutes />}>
                                    <Route element={<TestPage />} path="/tests">
                                        <Route element={<TestTable />} path="" />
                                        <Route element={<TestStartForm />} path="new/:groupID" />
                                        <Route element={<TestRunning />} path="running/:testID" />
                                        <Route element={<DistanceMeasurements />} path=":testID" />
                                        <Route element={<TestReviewPage />} path="review/:testID" />
                                    </Route>
                                    <Route element={<BleDevicePage />} path="/devices" >
                                        <Route element={<DeviceOverview />} path="" />
                                        <Route element={<BleDevices />} path="ble" />
                                        <Route element={<AddBleDeviceForm />} path="ble/add" />
                                        <Route element={<Calibration />} path="calibration" />
                                    </Route>
                                </Route>
                            </Route>
                            <Route element={<DashboardPage />} path="/dashboard" />
                            <Route element={<SettingsPage />} path="/devices/settings" />
                            <Route element={<DistancePage />} path="/distance" />
                            <Route element={<TestGroupPage />} path="/tests/groups">
                                <Route element={<TestGroupsTable />} path="" />
                                <Route element={<TestGroupAddForm />} path="add" />
                            </Route>
                        </Routes>
                    </div>
                </AuthProvider>
            </BrowserRouter>
        </div >
    );
}

export default App;

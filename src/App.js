import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import VendorDashboard from "./Pages/Vendor/VendorDashboard";

function App(){
    return(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LandingPage/>}/>
            <Route path="/vendor" element={<VendorDashboard/>}/>
        </Routes>

    </BrowserRouter>
    );

}

export default App;
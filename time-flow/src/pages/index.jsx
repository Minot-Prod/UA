import Layout from "./Layout.jsx";

import Clock from "./Clock";

import Stopwatch from "./Stopwatch";

import Timer from "./Timer";

import Alarms from "./Alarms";

import Dashboard from "./Dashboard";

import Music from "./Music";

import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

const PAGES = {
    
    Clock: Clock,
    
    Stopwatch: Stopwatch,
    
    Timer: Timer,
    
    Alarms: Alarms,
    
    Dashboard: Dashboard,
    
    Music: Music,
    
}

function _getCurrentPage(url) {
    if (url.endsWith('/')) {
        url = url.slice(0, -1);
    }
    let urlLastPart = url.split('/').pop();
    if (urlLastPart.includes('?')) {
        urlLastPart = urlLastPart.split('?')[0];
    }

    const pageName = Object.keys(PAGES).find(page => page.toLowerCase() === urlLastPart.toLowerCase());
    return pageName || Object.keys(PAGES)[0];
}

// Create a wrapper component that uses useLocation inside the Router context
function PagesContent() {
    const location = useLocation();
    const currentPage = _getCurrentPage(location.pathname);
    
    return (
        <Layout currentPageName={currentPage}>
            <Routes>            
                
                    <Route path="/" element={<Clock />} />
                
                
                <Route path="/Clock" element={<Clock />} />
                
                <Route path="/Stopwatch" element={<Stopwatch />} />
                
                <Route path="/Timer" element={<Timer />} />
                
                <Route path="/Alarms" element={<Alarms />} />
                
                <Route path="/Dashboard" element={<Dashboard />} />
                
                <Route path="/Music" element={<Music />} />
                
            </Routes>
        </Layout>
    );
}

export default function Pages() {
    return (
        <Router>
            <PagesContent />
        </Router>
    );
}
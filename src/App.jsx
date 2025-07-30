import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home.jsx'
import MainPage from './components/Projects/MainPage.jsx'

function App() {
    return (
        <Router basename="/">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projects/*" element={<MainPage />} />
                {/* Add more project routes as needed */}
            </Routes>
        </Router>
    )
}

export default App
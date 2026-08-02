import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

const Home = lazy(() => import('./components/Home/Home.jsx'))
const MainPage = lazy(() => import('./components/Projects/MainPage.jsx'))

function App() {
    return (
        <Router basename="/">
            <Suspense fallback={<div className="min-h-screen bg-canvas" />}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/projects/*" element={<MainPage />} />
                    {/* Add more project routes as needed */}
                </Routes>
            </Suspense>
        </Router>
    )
}

export default App

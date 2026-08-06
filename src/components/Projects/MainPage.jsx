import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'

import ProjectPage from './ProjectPage.jsx';

function MainPage() {
    return (
        <div className="relative h-full w-full bg-canvas min-h-screen">
            {/* Subtle gradient with your custom colors */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background: `radial-gradient(circle at 8% 100%, rgba(2, 133, 130, 0.48) 0%, rgba(2, 98, 95, 0.20) 24%, transparent 48%),
                        linear-gradient(115deg, #011417 0%, #011f21 42%, #023737 74%, #025452 100%)`
                }}
            />

            {/* Original background elements */}
            <div id="main-bg" className="z-10"></div>
            {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-15"></div> */}

            <Navbar />
            <div className="relative min-h-screen">
                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path=":slug" element={<ProjectPage />} />
                    </Routes>
                </AnimatePresence>
            </div>
            <Footer />
        </div>
    )
}

export default MainPage

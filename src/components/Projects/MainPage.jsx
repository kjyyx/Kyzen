import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from "framer-motion";
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'

import ProjectPage from './ProjectPage.jsx';

function MainPage() {
    return (
        <div className="relative h-full w-full bg-[#131313] min-h-screen">
            {/* Subtle gradient with your custom colors */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#2e175c]/70 via-[#2e175c]/40 via-[#ff75df]/20 to-black z-0"></div>

            {/* Original background elements */}
            <div id="main-bg" className="z-10"></div>
            {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-15"></div> */}

            <Navbar />
            <div className="relative z-20 mx-auto min-h-screen">
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
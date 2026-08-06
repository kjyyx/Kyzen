import React, { useState } from 'react'
import Navbar from '../Navbar/Navbar.jsx'
import Footer from '../Footer/Footer.jsx'
import ProjectGrid from '../ProjectGrid/ProjectGrid.jsx'
import CertificateGrid from '../CertificateGrid/CertificateGrid.jsx'
import HeaderGrid from '../HeaderGrid/HeaderGrid.jsx'
import AboutGrid from '../AboutGrid/AboutGrid.jsx'
import LoadingScreen from './LoadingScreen.jsx'
import DevelopmentModal from './DevelopmentModal.jsx'
// import SkillsGrid from '../SkillsGrid/SkillsGrid.jsx'
import './Home.css'

function Home() {
    const [isLoading, setIsLoading] = useState(true);
    // const [showDevModal, setShowDevModal] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    // const handleCloseDevModal = () => {
    //     setShowDevModal(false);
    // };

    return (
        <>
            {/* Always render main content */}
            <div className="relative h-full w-full bg-canvas min-h-screen">
                {/* Subtle gradient with your custom colors */}
                <div
                    className="absolute inset-0 z-0"
                    style={{
                        background: `radial-gradient(circle at 8% 100%, rgba(2, 133, 130, 0.48) 0%, rgba(2, 98, 95, 0.20) 24%, transparent 48%),
                            linear-gradient(115deg, #011417 0%, #011f21 42%, #023737 74%, #025452 100%)`
                    }}
                />

                {/* Soft atmospheric glow */}
                {/* <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-brand-light/25 via-[#023737]/15 to-transparent rounded-full blur-3xl z-5"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#023737]/30 via-brand-light/10 to-transparent rounded-full blur-2xl z-5"></div> */}

                {/* Original background elements */}
                <div id="main-bg" className="z-10"></div>
                {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-15"></div> */}

                <Navbar />
                <HeaderGrid />
                <div className="relative mx-auto min-h-screen max-w-[1366px] px-0 sm:px-8">
                    <AboutGrid />
                    <ProjectGrid />
                    <CertificateGrid />
                </div>
                <Footer />
            </div>

            {/* Loading screen overlay */}
            {isLoading && (
                <LoadingScreen onLoadingComplete={handleLoadingComplete} />
            )}

            {/* Development notice modal */}
            {/* {showDevModal && !isLoading && (
                <DevelopmentModal onClose={handleCloseDevModal} />
            )} */}
        </>
    )
}

export default Home;

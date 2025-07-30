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
    const [showDevModal, setShowDevModal] = useState(true);

    const handleLoadingComplete = () => {
        setIsLoading(false);
    };

    const handleCloseDevModal = () => {
        setShowDevModal(false);
    };

    return (
        <>
            {/* Always render main content */}
            <div className="relative h-full w-full bg-[#131313] min-h-screen">
                {/* Subtle gradient with your custom colors */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#2e175c]/70 via-[#2e175c]/40 via-[#ff75df]/20 to-black z-0"></div>

                {/* Soft atmospheric glow */}
                {/* <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-[#ff75df]/25 via-[#2e175c]/15 to-transparent rounded-full blur-3xl z-5"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#2e175c]/30 via-[#ff75df]/10 to-transparent rounded-full blur-2xl z-5"></div> */}

                {/* Original background elements */}
                <div id="main-bg" className="z-10"></div>
                {/* <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-15"></div> */}

                <Navbar />
                <div className="relative z-20 mx-auto min-h-screen px-4 sm:px-8">
                    <HeaderGrid />
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
            {showDevModal && !isLoading && (
                <DevelopmentModal onClose={handleCloseDevModal} />
            )}
        </>
    )
}

export default Home;
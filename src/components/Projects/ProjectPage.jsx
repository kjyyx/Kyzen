import React, { useEffect, memo } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { projects } from './projectsData';
import NextProjectSection from './NextProjectSection';

// Import extra sections
import ProjectStatistics from './ClarkNav/ProjectStatistics';
import KeyFeatures from './ClarkNav/KeyFeatures';
import ProjectShowcase from './ClarkNav/ProjectShowcase';
import MobileExperience from './ClarkNav/MobileExperience';
import ProjectImpact from './ClarkNav/ProjectImpact';

const extraSectionComponents = {
    ProjectStatistics,
    KeyFeatures,
    ProjectShowcase,
    MobileExperience,
    ProjectImpact
};

function ProjectPage() {
    const { slug } = useParams();
    useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [slug]);
    const project = projects.find(p => p.slug === slug);

    if (!project) return <div className="text-white text-2xl p-20">Project not found.</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="min-h-screen relative overflow-hidden"
        >
            <div className="min-h-screen relative overflow-hidden">
                {/* Hero Image */}
                <motion.div
                    className="relative overflow-hidden ml-[calc(-50vw+50%)]"
                    style={{
                        position: 'relative',
                        width: '100%',
                        height: 'calc(85vh - 236px)',
                        margin: 'calc(108px - 1.5vh) 0 calc(40px)',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'top',
                        backgroundSize: 'cover'
                    }}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <img
                        src={project.backgroundImage}
                        alt="Project showcase"
                        className="w-full h-full object-cover object-center"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </motion.div>

                {/* Main Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 pb-20">
                    {/* Overview */}
                    {/* ...use your LavaCraze Overview, TechnologyStack, ScreenshotGallery components here... */}
                    {/* Example: */}
                    {/* <ProjectOverview project={project} /> */}
                    {/* <TechnologyStack techStack={project.techStack} /> */}
                    {/* <ScreenshotGallery images={project.screenshots} /> */}

                    {/* Render extra sections for capstone/internship projects */}
                    {project.extraSections && project.extraSections.map((section, idx) => {
                        const SectionComponent = extraSectionComponents[section];
                        return SectionComponent ? <SectionComponent key={idx} project={project} /> : null;
                    })}

                    <NextProjectSection />
                </div>
            </div>
        </motion.div>
    );
}

export default memo(ProjectPage);
import CNImage from '../../assets/CN-6.png';
import LavaCrazeBg from '../../assets/Projects_Icons/Lavacraze_bg.png';

export const projects = [
    {
        slug: "clarknav",
        title: "CLARKNAV",
        subtitle: "Navigation Enhancement Project",
        category: "Web Development",
        description: "...",
        backgroundImage: CNImage,
        meta: { year: "2024", duration: "6 months", team: "Creative Team of 5", status: "Completed" },
        techStack: [ /* ... */],
        links: { website: "...", github: "...", live: "..." },
        highlights: [ /* ... */],
        screenshots: [ /* ... */],
        extraSections: ["ProjectStatistics", "KeyFeatures", "ProjectShowcase", "MobileExperience", "ProjectImpact"]
    },
    {
        slug: "lavacraze",
        title: "LAVACRAZE",
        subtitle: "Navigation Enhancement Project",
        category: "Web Development",
        description: "...",
        backgroundImage: LavaCrazeBg,
        meta: { year: "2024", duration: "6 months", team: "Creative Team of 5", status: "Completed" },
        techStack: [ /* ... */],
        links: { website: "...", github: "...", live: "..." },
        highlights: [ /* ... */],
        screenshots: [ /* ... */]
        // No extraSections for regular projects
    },
    // ...repeat for all projects...
];
import AtsBg from '../../assets/Projects_Icons/ATS_bg.webp';
import ClarknavBg from '../../assets/Projects_Icons/Clarknav_bg.webp';
import GptBg from '../../assets/Projects_Icons/GPT_bg.webp';
import BriskBg from '../../assets/Projects_Icons/Brisk_bg.webp';
import LavaCrazeBg from '../../assets/Projects_Icons/Lavacraze_bg.webp';
import SprintBg from '../../assets/Projects_Icons/Sprint_bg.webp';
import RailroadedBg from '../../assets/Projects_Icons/Railroaded_bg.webp';
import KairosBg from '../../assets/Projects_Icons/Kairos_bg.webp';

import BriskSS1 from '../../assets/Webpage_Screenshots/Brisk_ss1.webp';
import BriskSS2 from '../../assets/Webpage_Screenshots/Brisk_ss2.webp';
import BriskSS3 from '../../assets/Webpage_Screenshots/Brisk_ss3.webp';
import BriskSS4 from '../../assets/Webpage_Screenshots/Brisk_ss4.webp';

import GPTSS1 from '../../assets/Webpage_Screenshots/GPT_ss1.webp';
import GPTSS2 from '../../assets/Webpage_Screenshots/GPT_ss2.webp';
import GPTSS3 from '../../assets/Webpage_Screenshots/GPT_ss3.webp';
import GPTSS4 from '../../assets/Webpage_Screenshots/GPT_ss4.webp';
import GPTSS5 from '../../assets/Webpage_Screenshots/GPT_ss5.webp';

import KairosSS1 from '../../assets/Webpage_Screenshots/Kairos_ss1.webp';
import KairosSS2 from '../../assets/Webpage_Screenshots/Kairos_ss2.webp';
import KairosSS3 from '../../assets/Webpage_Screenshots/Kairos_ss3.webp';
import KairosSS4 from '../../assets/Webpage_Screenshots/Kairos_ss4.webp';

import LavacrazeSS1 from '../../assets/Webpage_Screenshots/Lavacraze_ss1.webp';
import LavacrazeSS2 from '../../assets/Webpage_Screenshots/Lavacraze_ss2.webp';

import RailroadedSS1 from '../../assets/Webpage_Screenshots/Railroaded_ss1.webp';
import RailroadedSS2 from '../../assets/Webpage_Screenshots/Railroaded_ss2.webp';
import RailroadedSS3 from '../../assets/Webpage_Screenshots/Railroaded_ss3.webp';
import RailroadedSS4 from '../../assets/Webpage_Screenshots/Railroaded_ss4.webp';
import RailroadedSS5 from '../../assets/Webpage_Screenshots/Railroaded_ss5.webp';

import SprintSS1 from '../../assets/Webpage_Screenshots/Sprint_ss1.webp';
import SprintSS2 from '../../assets/Webpage_Screenshots/Sprint_ss2.webp';

export const projects = [
    {
        slug: "clarknav",
        title: "CLARKNAV",
        subtitle: "Navigation Enhancement Project",
        category: "Web Development",
        description: "A comprehensive navigation system designed to enhance user experience and streamline digital workflows for modern applications.",
        backgroundImage: ClarknavBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "Angular", color: "#dd0031", icon: "https://angular.io/assets/images/logos/angular/angular.svg" },
            { name: "Laravel", color: "#ff2d20", icon: "https://laravel.com/img/logomark.min.svg" },
            { name: "PostgreSQL", color: "#336791", icon: "https://www.postgresql.org/media/img/about/press/elephant.webp" },
            { name: "TypeScript", color: "#3178c6", icon: "https://www.typescriptlang.org/favicon-32x32.webp" }
        ],
        links: {
            website: "https://www.clarknav.com",
            github: "https://github.com/example/clarknav",
            live: "https://demo.clarknav.com"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Full-Stack Developer" },
            { name: "Sarah Johnson", role: "UI/UX Designer" },
            { name: "Mike Chen", role: "Backend Developer" },
            { name: "Lisa Rodriguez", role: "Project Manager" },
            { name: "David Kim", role: "QA Engineer" }
        ],
        highlights: [
            "Capstone project achievement",
            "Real-time navigation updates",
            "Mobile-first responsive design",
            "Advanced user authentication"
        ],
        screenshots: [
            {
                src: "../src/assets/Webpage_Screenshots/CN (1).webp",
                alt: "ClarkNav Dashboard Overview"
            },
            {
                src: "../src/assets/Webpage_Screenshots/CN (2).webp",
                alt: "ClarkNav Navigation Interface"
            }
        ],
        // extraSections: ["ProjectStatistics", "KeyFeatures", "ProjectShowcase", "MobileExperience", "ProjectImpact"]
    },
    {
        slug: "itsats",
        title: "ITS ATS",
        subtitle: "Applicant Tracking System",
        category: "Enterprise Software",
        description: "A comprehensive applicant tracking system designed to streamline recruitment processes and enhance HR efficiency for modern organizations.",
        backgroundImage: AtsBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "Angular", color: "#dd0031", icon: "https://angular.io/assets/images/logos/angular/angular.svg" },
            { name: ".NET", color: "#512bd4", icon: "https://dotnet.microsoft.com/favicon.ico" },
            { name: "PostgreSQL", color: "#336791", icon: "https://www.postgresql.org/media/img/about/press/elephant.webp" },
            { name: "Azure", color: "#0078d4", icon: "https://azure.microsoft.com/favicon.ico" }
        ],
        links: {
            website: "https://www.itsats.com",
            github: "https://github.com/example/itsats",
            live: "https://demo.itsats.com"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Full-Stack Developer" },
            { name: "Shane Paras", role: "Senior Developer" },
            { name: "CJ Ocampo", role: "System Architect" }
        ],
        highlights: [
            "Internship project success",
            "Advanced applicant filtering",
            "Automated resume parsing",
            "Real-time collaboration tools"
        ],
        screenshots: [
            {
                src: "../src/assets/Webpage_Screenshots/ITS (1).webp",
                alt: "ITS ATS Dashboard"
            },
            {
                src: "../src/assets/Webpage_Screenshots/ITS (2).webp",
                alt: "ITS ATS Applicant Management"
            }
        ],
        // extraSections: ["ProjectStatistics", "KeyFeatures", "ProjectShowcase", "MobileExperience", "ProjectImpact"]
    },
    {
        slug: "lavacraze",
        title: "LAVACRAZE",
        subtitle: "First Client Website Project",
        category: "Client Web Development",
        description: "Lava Craze marks our debut website project tailored for a client, constructed using WordPress and powered by Hostinger hosting services. By integrating an array of plugins such as Site Kit, All-in-one SEO, Elementor, Google Analytics, and Autoptimize, our website seamlessly merges cutting-edge technology with captivating design, promising a delightful and user-friendly experience.",
        backgroundImage: LavaCrazeBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "WordPress", color: "#21759b", icon: "https://wordpress.org/favicon.ico" },
            { name: "Elementor", color: "#92003B", icon: "https://elementor.com/favicon.ico" },
            { name: "Hostinger", color: "#673de6", icon: "https://hostinger.com/favicon.ico" },
            { name: "Google Analytics", color: "#fbbc05", icon: "https://analytics.google.com/favicon.ico" },
            { name: "Site Kit", color: "#4285f4", icon: "https://sitekit.withgoogle.com/favicon.ico" },
            { name: "All-in-One SEO", color: "#00aa63", icon: "https://aioseo.com/favicon.ico" }
        ],
        links: {
            website: "https://www.lavacraze.com",
            github: "https://github.com/example/lavacraze",
            live: "https://www.lavacraze.com"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" },
            { name: "Dennis Dela Rosa", role: "Developer" },
            { name: "Dayson Delfin", role: "Developer" },
            { name: "Reuben Rob Sibal", role: "Developer" }
        ],
        highlights: [
            "First client website project",
            "SEO optimized with multiple plugins",
            "Performance enhanced with Autoptimize",
            "Professional hosting on Hostinger",
            "Comprehensive analytics integration",
            "User-friendly Elementor design"
        ],
        screenshots: [
            {
                src: LavacrazeSS1,
                alt: "LavaCraze Homepage Design"
            },
            {
                src: LavacrazeSS2,
                alt: "LavaCraze Content Pages"
            }
        ]
    },
    {
        slug: "railroaded",
        title: "RAILROADED",
        subtitle: "Philippine Railroad History Platform",
        category: "Educational Content Website",
        description: "Railroad-ED is an interesting website all about the history of the Philippine Railroad. It has blogs about its past, present, and future. The site is made with WordPress, making it easy for you to dive into the exciting story of the Philippine Railroad.",
        backgroundImage: RailroadedBg,
        meta: {
            year: "2023",
            status: "Live"
        },
        techStack: [
            { name: "WordPress", color: "#21759b", icon: "https://wordpress.org/favicon.ico" },
            { name: "PHP", color: "#777bb4", icon: "https://www.php.net/favicon.ico" },
            { name: "MySQL", color: "#4479a1", icon: "https://www.mysql.com/favicon.ico" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" }
        ],
        links: {
            website: "https://railroaded8.wordpress.com/",
            // github: "https://github.com/example/railroaded",
            live: "https://railroaded8.wordpress.com/"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" }
        ],
        highlights: [
            "Historical content platform",
            "Past, present, and future coverage",
            "Educational blog format",
            "WordPress CMS integration",
            "Philippine Railroad focused",
            "Easy content management"
        ],
        screenshots: [
            {
                src: RailroadedSS1,
                alt: "Railroaded Homepage Interface"
            },
            {
                src: RailroadedSS2,
                alt: "Railroaded Blog Articles"
            },
            {
                src: RailroadedSS3,
                alt: "Railroaded Historical Content"
            },
            {
                src: RailroadedSS4,
                alt: "Railroaded Navigation Menu"
            },
            {
                src: RailroadedSS5,
                alt: "Railroaded Content Management"
            }
        ]
    },
    {
        slug: "brisk",
        title: "BRISK",
        subtitle: "Advanced Vehicle Rental Service",
        category: "Web Application",
        description: "Brisk is an advanced vehicle rental service. It uses mySQL for a strong database and PHP, CSS, and JavaScript for a smooth and enjoyable user experience. Brisk incorporates CRUD operations (CREATE, READ, UPDATE, DELETE) to efficiently manage data. It redefines vehicle rental with a dynamic and user-friendly approach, blending cutting-edge technologies seamlessly.",
        backgroundImage: BriskBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "PHP", color: "#777bb4", icon: "https://www.php.net/favicon.ico" },
            { name: "MySQL", color: "#4479a1", icon: "https://www.mysql.com/favicon.ico" },
            { name: "JavaScript", color: "#f7df1e", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.webp" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
            { name: "HTML", color: "#e34c26", icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" }
        ],
        links: {
            website: "https://www.brisk.app",
            github: "https://github.com/example/brisk",
            live: "https://demo.brisk.app"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" },
            { name: "Miguel Enriquez", role: "Developer" },
            { name: "Daryll Medina", role: "Developer" },
            { name: "Charmagne Maniago", role: "Developer" }
        ],
        highlights: [
            "Complete CRUD operations",
            "Strong MySQL database foundation",
            "Dynamic user interface",
            "Efficient data management",
            "Vehicle rental optimization",
            "Seamless technology integration"
        ],
        screenshots: [
            {
                src: BriskSS1,
                alt: "Brisk Vehicle Rental Dashboard"
            },
            {
                src: BriskSS2,
                alt: "Brisk Vehicle Listing Page"
            },
            {
                src: BriskSS3,
                alt: "Brisk Booking Interface"
            },
            {
                src: BriskSS4,
                alt: "Brisk User Management System"
            }
        ]
    },
    {
        slug: "gpt",
        title: "GPT",
        subtitle: "Delightful Coffee Shop Experience",
        category: "E-commerce Web Application",
        description: "Galactic Pressed Tasting brings you a delightful coffee shop website, made with HTML, CSS, and JS for an enjoyable online experience. We've added MongoDB, a fancy database system, and integrated CRUD operations to make sure everything runs smoothly. This creates a strong and reliable platform for all coffee lovers out there.",
        backgroundImage: GptBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "HTML", color: "#e34c26", icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
            { name: "JavaScript", color: "#f7df1e", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.webp" },
            { name: "MongoDB", color: "#47a248", icon: "https://www.mongodb.com/favicon.ico" }
        ],
        links: {
            website: "https://www.gpt-tasting.com",
            github: "https://github.com/example/gpt-tasting",
            live: "https://demo.gpt-tasting.com"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" },
            { name: "Dennis Dela Rosa", role: "Developer" },
            { name: "Dayson Delfin", role: "Developer" },
            { name: "Reuben Rob Sibal", role: "Developer" },
            { name: "Jose Raphael Quiambao", role: "Developer" }
        ],
        highlights: [
            "Coffee shop focused platform",
            "MongoDB database integration",
            "Complete CRUD functionality",
            "Enjoyable user experience",
            "Reliable and strong foundation",
            "Coffee lover community platform"
        ],
        screenshots: [
            {
                src: GPTSS1,
                alt: "GPT Coffee Shop Homepage"
            },
            {
                src: GPTSS2,
                alt: "GPT Menu and Products"
            },
            {
                src: GPTSS3,
                alt: "GPT Order Management"
            },
            {
                src: GPTSS4,
                alt: "GPT Customer Interface"
            },
            {
                src: GPTSS5,
                alt: "GPT Admin Dashboard"
            }
        ]
    },
    {
        slug: "kairos",
        title: "KAIROS",
        subtitle: "Airport Terminal Navigation System",
        category: "Navigation Web Application",
        description: "At KAIROS, we've developed a cutting-edge website for Clark International Airport Terminal 2. Utilizing QR codes strategically placed throughout the terminal, our website instantly guides users to the nearest comfort room. Built with HTML, CSS, JavaScript, and Bootstrap, our site dynamically displays maps, enables zooming, and centers the map to the user's location for seamless navigation.",
        backgroundImage: KairosBg,
        meta: {
            year: "2024",
            status: "Live"
        },
        techStack: [
            { name: "HTML", color: "#e34c26", icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
            { name: "JavaScript", color: "#f7df1e", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.webp" },
            { name: "Bootstrap", color: "#7952b3", icon: "https://getbootstrap.com/favicon.ico" }
        ],
        links: {
            website: "https://kairosqr.bitbucket.io/",
            github: "https://github.com/example/kairos",
            live: "https://kairosqr.bitbucket.io/"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Front-End Developer" },
            { name: "Jazper Garcia", role: "Back-End Developer" }
        ],
        highlights: [
            "QR code navigation system",
            "Clark International Airport integration",
            "Dynamic interactive maps",
            "Location-based guidance",
            "Real-time comfort room finder",
            "Seamless user navigation experience"
        ],
        screenshots: [
            {
                src: KairosSS1,
                alt: "Kairos Airport Navigation Map"
            },
            {
                src: KairosSS2,
                alt: "Kairos QR Code Interface"
            },
            {
                src: KairosSS3,
                alt: "Kairos Location Finder"
            },
            {
                src: KairosSS4,
                alt: "Kairos Mobile Navigation"
            }
        ]
    },
    {
        slug: "sprint",
        title: "SPRINT",
        subtitle: "Modern Vehicle Rental Platform",
        category: "Service Web Application",
        description: "Sprint Auto Care is a modern vehicle rental service, designed with a blend of Bootstrap, HTML, CSS, and JS, enriched with the power of APIs (Application Programming Interfaces). Utilizing Atlassian's Jira Software and Bitbucket, along with Google's App Script, Form, Gmail, and Spreadsheet, the website becomes a dynamic and functional platform.",
        backgroundImage: SprintBg,
        meta: {
            year: "2024",
            status: "Completed"
        },
        techStack: [
            { name: "Bootstrap", color: "#7952b3", icon: "https://getbootstrap.com/favicon.ico" },
            { name: "HTML", color: "#e34c26", icon: "https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" },
            { name: "CSS", color: "#1572b6", icon: "https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" },
            { name: "JavaScript", color: "#f7df1e", icon: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.webp" },
            { name: "Google APIs", color: "#4285f4", icon: "https://developers.google.com/favicon.ico" },
            { name: "Jira", color: "#0052cc", icon: "https://www.atlassian.com/favicon.ico" }
        ],
        links: {
            website: "https://sprintersasi.bitbucket.io/SPRINTAutoCare1/",
            github: "https://github.com/example/sprint",
            live: "https://sprintersasi.bitbucket.io/SPRINTAutoCare1/"
        },
        teamMembers: [
            { name: "Kenji Jaculbia", role: "Developer" },
            { name: "Dennis Dela Rosa", role: "Developer" },
            { name: "Dayson Delfin", role: "Developer" },
            { name: "Reuben Rob Sibal", role: "Developer" }
        ],
        highlights: [
            "Modern vehicle rental service",
            "API integration for functionality",
            "Atlassian Jira project management",
            "Google Workspace integration",
            "Dynamic platform architecture",
            "Professional development workflow"
        ],
        screenshots: [
            {
                src: SprintSS1,
                alt: "Sprint Project Management Interface"
            },
                        {
                src: SprintSS2,
                alt: "Sprint Project Management Interface"
            }
        ]
    }
];
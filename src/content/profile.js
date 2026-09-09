import { siteConfig } from "@/shared/config/site";

export const profile = {
  identity: {
    fullName: siteConfig.fullName,
    displayName: siteConfig.shortName,
    role: siteConfig.role,
    specialization: {
      id: "Full-stack web development, mobile development, data analytics, dan machine learning.",
      en: "Full-stack web development, mobile development, data analytics, and machine learning.",
    },
    professionalHeadline: {
      id: "Fullstack Developer | Mobile Developer | Data Analyst",
      en: "Fullstack Developer | Mobile Developer | Data Analyst",
    },
    location: siteConfig.location,
    timezone: null,
  },
  contact: {
    email: siteConfig.email,
    phone: "0812-4309-1182",
    website: siteConfig.domain,
  },
  social: {
    github: siteConfig.github,
    linkedin: siteConfig.linkedin,
    socialLinks: [],
  },
  career: {
    availability: null,
    preferredWorkMode: null,
    employmentPreference: null,
    languages: [],
  },
  assets: {
    profileImage: "/placeholders/profile.png",
    resumePdf: siteConfig.resume,
  },
  narrative: {
    shortBio: {
      id: "Lulusan Informatika UPN \"Veteran\" Jawa Timur dengan pengalaman di full-stack web development, mobile application development, IT operations, dan data analysis.",
      en: "Informatics graduate from Universitas Pembangunan Nasional \"Veteran\" Jawa Timur with experience in full-stack web development, mobile application development, IT operations, and data analysis.",
    },
    longBio: {
      id: "Lulusan Informatika dari Universitas Pembangunan Nasional \"Veteran\" Jawa Timur dengan IPK 3,81/4,00 dan pengalaman di full-stack web development, mobile application development, IT operations, serta data analysis. Menguasai Laravel, PHP, MySQL, Kotlin, Jetpack Compose, serta workflow data dan machine learning berbasis Python. Memiliki kemampuan analytical thinking, problem solving, collaboration, software testing, dan system analysis.",
      en: "Informatics graduate from Universitas Pembangunan Nasional \"Veteran\" Jawa Timur with a GPA of 3.81/4.00 and experience in full-stack web development, mobile application development, IT operations, and data analysis. Skilled in Laravel, PHP, MySQL, Kotlin, Jetpack Compose, and Python-based data and machine learning workflows, with strong analytical thinking, problem-solving, collaboration, software-testing, and system-analysis abilities.",
    },
    professionalPositioning: {
      id: "Menggabungkan pengembangan software end-to-end dengan kemampuan analisis data, pengujian, dan pemecahan masalah untuk membangun solusi web, mobile, serta data yang dapat digunakan secara praktis.",
      en: "Combining end-to-end software development with data analysis, testing, and problem-solving capabilities to build practical web, mobile, and data-driven solutions.",
    },
    workingApproach: {
      id: "Memulai dari analisis kebutuhan, menerjemahkannya menjadi implementasi front-end, back-end, mobile, atau data workflow, lalu melakukan validasi dan software testing sebelum perbaikan berikutnya.",
      en: "Starts with requirement analysis, translates requirements into front-end, back-end, mobile, or data workflows, and then validates the result through software testing before further improvement.",
    },
    values: {
      id: ["Problem solving", "Analytical thinking", "Kolaborasi", "Komunikasi", "Adaptabilitas"],
      en: ["Problem solving", "Analytical thinking", "Collaboration", "Communication", "Adaptability"],
    },
    currentFocus: {
      id: "Memperkuat kemampuan full-stack development, mobile development, data analytics, dan penerapan machine learning dalam solusi digital.",
      en: "Strengthening capabilities in full-stack development, mobile development, data analytics, and the application of machine learning in digital solutions.",
    },
    currentlyExploring: null,
    interests: {
      id: ["Full-stack development", "Mobile development", "Data analytics", "Machine learning", "UI/UX design"],
      en: ["Full-stack development", "Mobile development", "Data analytics", "Machine learning", "UI/UX design"],
    },
    engineeringPrinciples: {
      id: [
        "Gunakan analisis kebutuhan dan system analysis sebagai dasar implementasi.",
        "Validasi fungsi melalui software testing dan data validation sebelum delivery.",
        "Jaga implementasi tetap terstruktur, dapat dipelihara, dan sesuai kebutuhan pengguna maupun bisnis.",
      ],
      en: [
        "Use requirement analysis and system analysis as the foundation for implementation.",
        "Validate functionality through software testing and data validation before delivery.",
        "Keep implementations structured, maintainable, and aligned with user and business requirements.",
      ],
    },
  },
};

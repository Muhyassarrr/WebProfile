import { certifications } from "@/content/certifications";
import { education } from "@/content/education";
import { experience } from "@/content/experience";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects";
import { skills } from "@/content/skills";

export const contentRepository = Object.freeze({
  getProfile: () => profile,
  getExperience: () => experience,
  getEducation: () => education,
  getSkills: () => skills,
  getProjects: () => projects,
  getCertifications: () => certifications,
});

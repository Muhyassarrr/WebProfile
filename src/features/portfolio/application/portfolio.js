import { contentRepository } from "../infrastructure/contentRepository";

export const getProfile = () => contentRepository.getProfile();
export const getExperience = () => contentRepository.getExperience();
export const getEducation = () => contentRepository.getEducation();
export const getSkills = () => contentRepository.getSkills();
export const getProjects = () => contentRepository.getProjects();
export const getCertifications = () => contentRepository.getCertifications();
export const getFeaturedProjects = () => getProjects().filter((project) => project.featured);
export const getProjectBySlug = (slug) => getProjects().find((project) => project.slug === slug) || null;

import * as repo from "../repositories/projectRepository.js";

export const listProjects = async () => await repo.getAllProjects();
export const getProject = async (id) => await repo.getProjectById(id);
export const addProject = (name, description) => repo.createProject(name, description);
export const editProject = (id, name, description) => repo.updateProject(id, name, description);
export const removeProject = (id) => repo.deleteProject(id);

const Project = require("../models/Projects.model");
const {
  createProjectService,
  updateProjectService,
  deleteProjectService,
} = require("../services/projects.services");

// create a Project
const create = async (req, res, next) => {
  try {
    const newProject = await createProjectService(req, res);
    res.status(200).json({
      message: "Successfully Added project!",
      project: newProject,
    });
  } catch (err) {
    next(err);
  }
};
const list = async (req, res) => {
  try {
    let projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const projectByID = async (req, res) => {
  const projectId = req.params.projectId;
  try {
    let project = await Project.findById(projectId);
    if (!project)
      return res.status("400").json({
        error: "project not found",
      });
    return res.status("200").json(project);
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve project",
    });
  }
};
const update = async (req, res) => {
  try {
    const updatedProject = await updateProjectService(req, res);
    res.status(200).json({
      message: "success",
      project: updatedProject,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const deleteProject = async (req, res, next) => {
  try {
    deleteProjectService(req, res);
  } catch (err) {
    next(err);
  }
};
module.exports = { create, list, projectByID, update, deleteProject };

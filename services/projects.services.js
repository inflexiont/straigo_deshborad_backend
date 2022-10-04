const Project = require("../models/Projects.model");
const createProjectService = async (req, res) => {
  let newProject;
  const {
    title,
    subtitle,
    filters,
    details,
    galleryImages,
    url,
    github_url,
    coverImage,
  } = req.body;
  // Upload image to cloudinary

  // create
  newProject = new Project({
    coverImage,
    title,
    filters,
    date: new Date(),
    details,
    title,
    subtitle,
    details,
    galleryImages,
    url,
    github_url,
  });

  return await newProject.save();
};
const updateProjectService = async (req, res) => {
  const projectId = req.params.projectId;
  const {
    title: newTitle,
    subtitle: newCategory,
    filters: newFilters,
    url: newUrl,
    github_url: newGithub_url,
    details: newDetails,
  } = req.body;

  const project = await Project.findById(projectId);
  if (!project)
    return res.status(404).json({ message: "project is not found" });
  if (project) {
    const { title, subtitle, filters, url, github_url, details } = project;

    const update = {
      title: newTitle ?? title,
      subtitle: newCategory ?? subtitle,
      filters: newFilters ?? filters,
      url: newUrl ?? url,
      github_url: newGithub_url ?? github_url,
      details: newDetails ?? details,
    };

    return Project.findByIdAndUpdate(projectId, update, { new: true });
  } else {
    if (!project)
      return res.status(404).json({ message: "project is not found" });
  }
};
const deleteProjectService = async (req, res) => {
  let projectId = req.params.projectId;
  const project = await Project.findById(projectId);
  if (!project) {
    return res.status(400).json({ message: "not found project" });
  }
  await Project.deleteOne({ id: projectId });
  return res.status(203).json({ message: "success" });
};
module.exports = {
  createProjectService,
  updateProjectService,
  deleteProjectService,
};

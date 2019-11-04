import projects from "../../database";

export default async (req, res, next) => {
  const { id } = req.params;

  const projectId = projects.find(project => project.id === id);

  if (!projectId) {
    return res.status(400).json({ error: "Invalid ID" });
  }

  return next();
};

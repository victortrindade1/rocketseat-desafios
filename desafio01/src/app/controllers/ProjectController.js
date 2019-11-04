import projects from "../../database";

class ProjectController {
  async store(req, res) {
    const { id, title } = req.body; // const newProject = req.body;

    await projects.push({ id, title }); // projects.push(newProject);

    return res.json(projects); // return res.json({ newProject });
  }

  index(req, res) {
    return res.json(projects);
  }

  update(req, res) {
    const { id } = req.params;

    // Acho index do array projects referente ao id da request
    const index = projects.findIndex(p => p.id == id);
    // const index = projects
    //   .map(project => {
    //     return project.id;
    //   })
    //   .indexOf(id);

    // Atualiza o título
    const { title } = req.body;

    projects[index].title = title;

    return res.json(projects);
  }

  delete(req, res) {
    const { id } = req.params;

    // Acho index do array projects referente ao id da request
    const index = projects.findIndex(p => p.id == id);
    // const index = projects
    //   .map(project => {
    //     return project.id;
    //   })
    //   .indexOf(id);

    if (index > -1) {
      projects.splice(index, 1);
    }

    return res.json(projects);
  }
}

export default new ProjectController();

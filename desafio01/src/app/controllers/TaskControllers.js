import projects from "../../database";

class TaskController {
  async store(req, res) {
    const { id } = req.params;

    // Acho index do array projects referente ao id da request
    const index = projects.findIndex(p => p.id == id);
    // const index = projects
    //   .map(project => {
    //     return project.id;
    //   })
    //   .indexOf(id);

    // Title da task
    const { title } = req.body;

    projects[index].task.push(title);

    return res.json(projects[index]);
  }
}

export default new TaskController();

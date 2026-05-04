using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private static List<Project> projects = new();

    [HttpGet]
    public IActionResult GetProjects()
    {
        return Ok(projects);
    }

    [HttpPost]
    public IActionResult CreateProject(Project project)
    {
        project.Id = projects.Count + 1;
        projects.Add(project);
        return Ok(project);
    }
}
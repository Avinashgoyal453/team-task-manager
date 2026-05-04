using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private static List<TaskItem> tasks = new();

    [HttpGet]
    public IActionResult GetTasks()
    {
        return Ok(tasks);
    }

    [HttpPost]
    public IActionResult CreateTask(TaskItem task)
    {
        task.Id = tasks.Count + 1;
        tasks.Add(task);
        return Ok(task);
    }

    [HttpPut("{id}")]
   public IActionResult UpdateTask(int id, [FromBody] string status)
{
    var task = tasks.FirstOrDefault(x => x.Id == id);
    if (task == null) return NotFound();

    task.Status = status;

    return Ok(task);
}
}
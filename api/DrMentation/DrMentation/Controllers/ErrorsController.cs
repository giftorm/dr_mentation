using Microsoft.AspNetCore.Mvc;

namespace DrMentation.Controllers;

public class ErrorsController : ControllerBase
{
    [Route("/error")]
    public IActionResult Error()
    {
        return Problem();
    }
}

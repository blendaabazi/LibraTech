using Microsoft.AspNetCore.Mvc;

namespace Lab1_Backend.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}

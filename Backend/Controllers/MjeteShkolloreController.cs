//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Lab1_Backend.Models;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class MjeteShkolloreController : ControllerBase
//    {
//        private readonly LibrariaContext _mjeteShkolloreContext;
//        private readonly IWebHostEnvironment _env;

//        public MjeteShkolloreController(LibrariaContext mjeteShkolloreContext, IWebHostEnvironment env)
//        {
//            _mjeteShkolloreContext = mjeteShkolloreContext;
//            _env = env;
//        }
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<MjeteShkollore>>> GetMjeteShkollore()
//        {
//            if (_mjeteShkolloreContext.MjeteShkollore == null)
//            {
//                return NotFound();
//            }
//            return await _mjeteShkolloreContext.MjeteShkollore.ToListAsync();
//        }
//        [HttpGet("{id}")]
//        public async Task<ActionResult<MjeteShkollore>> GetMjeteShkollore(int id)
//        {
//            var mjeteShkollore = await _mjeteShkolloreContext.MjeteShkollore.FindAsync(id);
//            if (mjeteShkollore == null)
//            {
//                return NotFound();
//            }
//            return mjeteShkollore;
//        }

//        [HttpPost]
//        public async Task<ActionResult<MjeteShkollore>> PostMjeteShkollore(MjeteShkollore mjete)
//        {
//            _mjeteShkolloreContext.MjeteShkollore.Add(mjete);
//            await _mjeteShkolloreContext.SaveChangesAsync();

//            return CreatedAtAction(nameof(GetMjeteShkollore), new { id = mjete.ID }, mjete);
//        }


//        [HttpPut]
//        public async Task<ActionResult> PutMjeteShkollore(MjeteShkollore mjete)
//        {
//            if (mjete == null || mjete.ID == 0)
//            {
//                return BadRequest("Invalid object or ID.");
//            }

//            _mjeteShkolloreContext.Entry(mjete).State = EntityState.Modified;
//            try
//            {
//                await _mjeteShkolloreContext.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                throw;
//            }
//            return Ok();
//        }


//        [HttpDelete("{id}")]
//        public async Task<ActionResult> DeleteMjeteShkollore(int id)
//        {
//            if (_mjeteShkolloreContext.MjeteShkollore == null)
//            {
//                return NotFound();
//            }
//            var mjete = await _mjeteShkolloreContext.MjeteShkollore.FindAsync(id);
//            if (mjete == null)
//            {
//                return NotFound();
//            }
//            _mjeteShkolloreContext.MjeteShkollore.Remove(mjete);
//            await _mjeteShkolloreContext.SaveChangesAsync();
//            return Ok();
//        } 
   
//        private bool MjeteShkolloreExists(int id)
//        {
//            return _mjeteShkolloreContext.MjeteShkollore.Any(e => e.ID == id);
//        }
//        [HttpGet("GetMjetetShkollore")]
//        public async Task<ActionResult<IEnumerable<MjeteShkollore>>> GetNewestBooks()
//        {

//            var newestBooks = await _mjeteShkolloreContext.MjeteShkollore.OrderByDescending(l => l.ID).Take(6).ToListAsync();
//            if (newestBooks == null)
//            {
//                return NotFound();
//            }
//            return newestBooks;
//        }
//        [HttpGet("tipi/{tipi}")]
//        public ActionResult<IEnumerable<MjeteShkollore>> GetMjetetbyTipi(string tipi)
//        {
//            var mjetet = _mjeteShkolloreContext.MjeteShkollore.Where(l => l.Tipi == tipi).ToList();

//            if (mjetet == null || mjetet.Count == 0)
//            {
//                return NotFound();
//            }

//            return mjetet;
//        }
//        [HttpGet("GetAllMjetet")]
//        public async Task<ActionResult<IEnumerable<MjeteShkollore>>> GetAllMjetet()
//        {
//            return await _mjeteShkolloreContext.MjeteShkollore.ToListAsync();
//        }

//        [HttpGet]
//        [Route("GetFoto/{id}")]
//        public IActionResult GetFoto(int id)
//        {
//            var libri = _mjeteShkolloreContext.MjeteShkollore.FirstOrDefault(l => l.ID == id);
//            if (libri == null || string.IsNullOrEmpty(libri.ImgPath))
//            {
//                return NotFound();
//            }

//            var imagePath = Path.Combine("Photos", libri.ImgPath);
//            if (!System.IO.File.Exists(imagePath))
//            {
//                return NotFound();
//            }

//            var image = System.IO.File.OpenRead(imagePath);
//            return File(image, "image/jpeg");
//        }

//        [HttpGet("TotalMjetet")]
//        public async Task<ActionResult<int>> GetTotalMjetet()
//        {
//            var totalLibrat = await _mjeteShkolloreContext.MjeteShkollore.CountAsync();
//            return totalLibrat;
//        }


//        [Route("SaveFile")]
//        [HttpPost]
//        public JsonResult SaveFile()
//        {
//            try
//            {
//                var httpRequest = Request.Form;
//                var postedFile = httpRequest.Files[0];
//                string filename = postedFile.FileName;
//                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

//                using (var stream = new FileStream(physicalPath, FileMode.Create))
//                {
//                    postedFile.CopyTo(stream);
//                }

//                return new JsonResult(filename);
//            }
//            catch (Exception)
//            {

//                return new JsonResult("img.png");
//            }
//        }
//    }

//}

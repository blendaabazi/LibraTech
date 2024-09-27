using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Lab1_Backend.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Hosting;
using System.IO;
using System.Linq;
using Microsoft.AspNetCore.Authorization;

namespace Lab1_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MjeteShkolloreController : ControllerBase
    {
        private readonly LibrariaContext _mjeteShkolloreContext;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public MjeteShkolloreController(LibrariaContext mjeteShkolloreContext, IConfiguration configuration, IWebHostEnvironment env)
        {
            _mjeteShkolloreContext = mjeteShkolloreContext;
            _configuration = configuration;
            _env = env;
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MjeteShkollore>>> GetMjeteShkollore()
        {
            return await _mjeteShkolloreContext.MjeteShkollore
                                               .Include(m => m.Tipi)
                                               .Include(m => m.ShtetiMSh)
                                               .Include(m => m.ProdhuesiMSh)
                                               .ToListAsync();
        }

        [HttpGet("{id}")]
        [AllowAnonymous]
        public async Task<ActionResult<MjeteShkollore>> GetMjeteShkollore(int id)
        {
            var mjeteShkollore = await _mjeteShkolloreContext.MjeteShkollore
                                                             .Include(m => m.Tipi)
                                                             .Include(m => m.ShtetiMSh)
                                                             .Include(m => m.ProdhuesiMSh)
                                                             .FirstOrDefaultAsync(m => m.ID == id);

            if (mjeteShkollore == null)
            {
                return NotFound();
            }

            return mjeteShkollore;
        }

        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<MjeteShkollore>> PostMjeteShkollore([FromBody] MjeteShkolloreDto mjeteShkolloreDto)
        {
            try
            {
                if (mjeteShkolloreDto == null)
                {
                    return BadRequest("Mjete Shkollore data is null.");
                }

                var mjeteShkollore = new MjeteShkollore
                {
                    Pershkrimi = mjeteShkolloreDto.Pershkrimi,
                    TipiID = mjeteShkolloreDto.TipiID,
                    ShtetiMShID = mjeteShkolloreDto.ShtetiMShID,
                    ProdhuesiMShID = mjeteShkolloreDto.ProdhuesiMShID,
                    Cmimi = mjeteShkolloreDto.Cmimi,
                    Sasia = mjeteShkolloreDto.Sasia,
                    ImgPath = mjeteShkolloreDto.ImgPath
                };

                _mjeteShkolloreContext.MjeteShkollore.Add(mjeteShkollore);
                await _mjeteShkolloreContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetMjeteShkollore), new { id = mjeteShkollore.ID }, mjeteShkollore);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> PutMjeteShkollore(int id, [FromBody] MjeteShkolloreDto mjeteShkolloreDto)
        {
            try
            {
                if (id != mjeteShkolloreDto.ID)
                {
                    return BadRequest("ID mismatch.");
                }

                var mjeteShkollore = await _mjeteShkolloreContext.MjeteShkollore.FindAsync(id);
                if (mjeteShkollore == null)
                {
                    return NotFound();
                }

                mjeteShkollore.Pershkrimi = mjeteShkolloreDto.Pershkrimi;
                mjeteShkollore.TipiID = mjeteShkolloreDto.TipiID;
                mjeteShkollore.ShtetiMShID = mjeteShkolloreDto.ShtetiMShID;
                mjeteShkollore.ProdhuesiMShID = mjeteShkolloreDto.ProdhuesiMShID;
                mjeteShkollore.Cmimi = mjeteShkolloreDto.Cmimi;
                mjeteShkollore.Sasia = mjeteShkolloreDto.Sasia;
                mjeteShkollore.ImgPath = mjeteShkolloreDto.ImgPath;

                _mjeteShkolloreContext.Entry(mjeteShkollore).State = EntityState.Modified;
                await _mjeteShkolloreContext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteMjeteShkollore(int id)
        {
            var mjeteShkollore = await _mjeteShkolloreContext.MjeteShkollore.FindAsync(id);
            if (mjeteShkollore == null)
            {
                return NotFound();
            }

            _mjeteShkolloreContext.MjeteShkollore.Remove(mjeteShkollore);
            await _mjeteShkolloreContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpGet("TotalMjetet")]
        [AllowAnonymous]
        public async Task<ActionResult<int>> GetTotalMjetet()
        {
            var totalMjetet = await _mjeteShkolloreContext.MjeteShkollore.CountAsync();
            return totalMjetet;
        }

        [HttpGet("GetMjetetMeTeRinje")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MjeteShkollore>>> GetNewestMjete()
        {
            var newestMjete = await _mjeteShkolloreContext.MjeteShkollore.OrderByDescending(m => m.ID).Take(6).ToListAsync();
            return newestMjete;
        }

        [HttpGet("tipi/{tipi}")]
        [AllowAnonymous]
        public async Task<ActionResult<IEnumerable<MjeteShkollore>>> GetMjeteByTipi(int tipi)
        {
            var mjetet = await _mjeteShkolloreContext.MjeteShkollore
                                                     .Where(m => m.TipiID == tipi)
                                                     .ToListAsync();
            if (mjetet == null || mjetet.Count == 0)
            {
                return NotFound();
            }
            return mjetet;
        }

        [HttpGet]
        [Route("GetFoto/{id}")]
        [AllowAnonymous]
        public IActionResult GetFoto(int id)
        {
            var mjeteShkollore = _mjeteShkolloreContext.MjeteShkollore.FirstOrDefault(m => m.ID == id);
            if (mjeteShkollore == null || string.IsNullOrEmpty(mjeteShkollore.ImgPath))
            {
                return NotFound();
            }

            var imagePath = Path.Combine("Photos", mjeteShkollore.ImgPath);
            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound();
            }

            var image = System.IO.File.OpenRead(imagePath);
            return File(image, "image/jpeg");
        }

        [Route("SaveFile")]
        [HttpPost]
        [AllowAnonymous]
        public JsonResult SaveFile()
        {
            try
            {
                var httpRequest = Request.Form;
                var postedFile = httpRequest.Files[0];
                string filename = postedFile.FileName;
                var physicalPath = _env.ContentRootPath + "/Photos/" + filename;

                using (var stream = new FileStream(physicalPath, FileMode.Create))
                {
                    postedFile.CopyTo(stream);
                }

                return new JsonResult(filename);
            }
            catch (Exception)
            {
                return new JsonResult("img.png");
            }
        }

        private bool MjeteShkolloreExists(int id)
        {
            return _mjeteShkolloreContext.MjeteShkollore.Any(e => e.ID == id);
        }
    }

    public class MjeteShkolloreDto
    {
        public int ID { get; set; }
        public string Pershkrimi { get; set; }
        public int? TipiID { get; set; }
        public int? ShtetiMShID { get; set; }
        public int? ProdhuesiMShID { get; set; }
        public double Cmimi { get; set; }
        public int Sasia { get; set; }
        public string ImgPath { get; set; }
    }
}

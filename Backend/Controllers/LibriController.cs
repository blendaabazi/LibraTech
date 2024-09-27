using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Lab1_Backend.Models;
using Backend.Models;
using Microsoft.AspNetCore.Authorization;

namespace Lab1_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LibriController : ControllerBase
    {
        private readonly LibrariaContext _bookContext;
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;

        public LibriController(LibrariaContext bookContext, IConfiguration configuration, IWebHostEnvironment env)
        {
            _bookContext = bookContext;
            _configuration = configuration;
            _env = env;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Libri>>> GetLibri()
        {
            return await _bookContext.Libri
                                     .Include(l => l.Autori)
                                     .Include(l => l.Kategoria)
                                     .Include(l => l.ShtepiaBotuese)
                                     .Include(l => l.Gjuha)
                                     .ToListAsync();
        }
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<ActionResult<Libri>> GetLibri(int id)
        {
            var libri = await _bookContext.Libri
                                          .Include(l => l.Autori)
                                          .Include(l => l.Kategoria)
                                          .Include(l => l.ShtepiaBotuese)
                                          .Include(l => l.Gjuha)
                                          .FirstOrDefaultAsync(l => l.ID == id);

            if (libri == null)
            {
                return NotFound();
            }

            return libri;
        }
        
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Libri>> PostLibri([FromBody] LibriDto libriDto)
        {
            try
            {
                if (libriDto == null)
                {
                    return BadRequest("Libri data is null.");
                }

                var libri = new Libri
                {
                    ISBN = libriDto.ISBN,
                    Titulli = libriDto.Titulli,
                    Pershkrimi = libriDto.Pershkrimi,
                    AutoriID = libriDto.AutoriID,
                    NrFaqeve = libriDto.NrFaqeve,
                    KategoriaID = libriDto.KategoriaID,
                    VitiPublikimit = libriDto.VitiPublikimit,
                    ShtepiaBotueseID = libriDto.ShtepiaBotueseID,
                    GjuhaID = libriDto.GjuhaID,
                    Cmimi = libriDto.Cmimi,
                    Sasia = libriDto.Sasia,
                    ImgPath = libriDto.ImgPath
                };

                _bookContext.Libri.Add(libri);
                await _bookContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetLibri), new { id = libri.ID }, libri);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [Authorize(Policy = "AdminOnly")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLibri(int id, [FromBody] LibriDto libriDto)
        {
            try
            {
                if (id != libriDto.ID)
                {
                    return BadRequest("ID mismatch.");
                }

                var libri = await _bookContext.Libri.FindAsync(id);
                if (libri == null)
                {
                    return NotFound();
                }

                libri.ISBN = libriDto.ISBN;
                libri.Titulli = libriDto.Titulli;
                libri.Pershkrimi = libriDto.Pershkrimi;
                libri.AutoriID = libriDto.AutoriID;
                libri.NrFaqeve = libriDto.NrFaqeve;
                libri.KategoriaID = libriDto.KategoriaID;
                libri.VitiPublikimit = libriDto.VitiPublikimit;
                libri.ShtepiaBotueseID = libriDto.ShtepiaBotueseID;
                libri.GjuhaID = libriDto.GjuhaID;
                libri.Cmimi = libriDto.Cmimi;
                libri.Sasia = libriDto.Sasia;
                libri.ImgPath = libriDto.ImgPath;

                _bookContext.Entry(libri).State = EntityState.Modified;
                await _bookContext.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [Authorize(Policy = "AdminOnly")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLibri(int id)
        {
            var libri = await _bookContext.Libri.FindAsync(id);
            if (libri == null)
            {
                return NotFound();
            }

            _bookContext.Libri.Remove(libri);
            await _bookContext.SaveChangesAsync();

            return NoContent();
        }
        [AllowAnonymous]
        [HttpGet("TotalLibrat")]
        public async Task<ActionResult<int>> GetTotalLibrat()
        {
            var totalLibrat = await _bookContext.Libri.CountAsync();
            return totalLibrat;
        }
        [AllowAnonymous]
        [HttpGet("GetLibratMeTeRinje")]
        public async Task<ActionResult<IEnumerable<Libri>>> GetNewestBooks()
        {
            var newestBooks = await _bookContext.Libri.OrderByDescending(l => l.ID).Take(6).ToListAsync();
            return newestBooks;
        }
        [AllowAnonymous]
        [HttpGet("kategoria/{kategoriaId}")]
        public async Task<IActionResult> GetLibratByKategoria(int kategoriaId)
        {
            var librat = await _bookContext.Libri
                .Include(l => l.Kategoria)
                .Where(l => l.KategoriaID == kategoriaId)
                .ToListAsync();

            if (librat == null || !librat.Any())
            {
                return NotFound("Nuk ka libra për këtë kategori.");
            }

            return Ok(librat);
        }
        [AllowAnonymous]

        [HttpGet]
        [Route("GetFoto/{id}")]
        public IActionResult GetFoto(int id)
        {
            var libri = _bookContext.Libri.FirstOrDefault(l => l.ID == id);
            if (libri == null || string.IsNullOrEmpty(libri.ImgPath))
            {
                return NotFound();
            }

            var imagePath = Path.Combine("Photos", libri.ImgPath);
            if (!System.IO.File.Exists(imagePath))
            {
                return NotFound();
            }

            var image = System.IO.File.OpenRead(imagePath);
            return File(image, "image/jpeg");
        }
        [AllowAnonymous]
        [Route("SaveFile")]
        [HttpPost]
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

        private bool LibriExists(int id)
        {
            return _bookContext.Libri.Any(e => e.ID == id);
        }
    }

    public class LibriDto
    {
        public int ID { get; set; }
        public string ISBN { get; set; }
        public string Titulli { get; set; }
        public string Pershkrimi { get; set; }
        public int AutoriID { get; set; }
        public int NrFaqeve { get; set; }
        public int KategoriaID { get; set; }
        public int VitiPublikimit { get; set; }
        public int ShtepiaBotueseID { get; set; }
        public int GjuhaID { get; set; }
        public double Cmimi { get; set; }
        public int Sasia { get; set; }
        public string ImgPath { get; set; }
    }
}

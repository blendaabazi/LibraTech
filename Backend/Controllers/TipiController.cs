//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.AspNetCore.Mvc;
//using Lab1_Backend.Models;
//using Microsoft.EntityFrameworkCore;

//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class TipiController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public TipiController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Tipi
//        [HttpGet]
//        public ActionResult<IEnumerable<Tipi>> GetTipi()
//        {
//            return _context.Tipi.ToList();
//        }

//        // GET: api/Tipi/5
//        [HttpGet("{id}")]
//        public ActionResult<Tipi> GetTipi(int id)
//        {
//            var tipi = _context.Tipi.Find(id);

//            if (tipi == null)
//            {
//                return NotFound();
//            }

//            return tipi;
//        }

//        // POST: api/Tipi
//        [HttpPost]
//        public async Task<ActionResult<Tipi>> PostTipi(Tipi tip)
//        {
//            _context.Tipi.Add(tip);
//            await _context.SaveChangesAsync();


//            return CreatedAtAction(nameof(GetTipi), new { id = tip.TipiID }, tip);
//        }
//        [HttpPut]
//        public IActionResult PutTipi(Tipi tipi)
//        {
//            if (tipi == null)
//            {
//                return BadRequest("Invalid object.");
//            }

//            // Nëse duhet, bëni validime të tjera për të dhënat e 'tipi'

//            _context.Entry(tipi).State = EntityState.Modified;
//            try
//            {
//                _context.SaveChanges();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                throw;
//            }
//            return NoContent();
//        }


//        // DELETE: api/Tipi/5
//        [HttpDelete("{id}")]
//        public IActionResult DeleteTipi(int id)
//        {
//            var tipi = _context.Tipi.Find(id);
//            if (tipi == null)
//            {
//                return NotFound();
//            }

//            _context.Tipi.Remove(tipi);
//            _context.SaveChanges();

//            return NoContent();
//        }
//    }
//}

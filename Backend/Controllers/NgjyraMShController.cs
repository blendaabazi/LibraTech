//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.AspNetCore.Mvc;
//using Lab1_Backend.Models;
//using Microsoft.EntityFrameworkCore;

//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class NgjyraMShController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public NgjyraMShController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Tipi
//        [HttpGet]
//        public ActionResult<IEnumerable<NgjyraMSh>> GetNgjyra()
//        {
//            return _context.NgjyraMSh.ToList();
//        }

//        // GET: api/Tipi/5
//        [HttpGet("{id}")]
//        public ActionResult<NgjyraMSh> GetNjyra(int id)
//        {
//            var ngjyra = _context.NgjyraMSh.Find(id);

//            if (ngjyra == null)
//            {
//                return NotFound();
//            }

//            return ngjyra;
//        }

//        // POST: api/Tipi
//        [HttpPost]
//        public async Task<ActionResult<NgjyraMSh>> PostNjesiaMSh(NgjyraMSh njesia)
//        {
//            _context.NgjyraMSh.Add(njesia);
//            await _context.SaveChangesAsync();


//            return CreatedAtAction(nameof(GetNgjyra), new { id = njesia.ID }, njesia);
//        }
//        [HttpPut]
//        public IActionResult PutNjesia(NgjyraMSh njesia)
//        {
//            if (njesia == null)
//            {
//                return BadRequest("Invalid object.");
//            }



//            _context.Entry(njesia).State = EntityState.Modified;
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
//        public IActionResult DeleteNgjyra(int id)
//        {
//            var njesia = _context.NgjyraMSh.Find(id);
//            if (njesia == null)
//            {
//                return NotFound();
//            }

//            _context.NgjyraMSh.Remove(njesia);
//            _context.SaveChanges();

//            return NoContent();
//        }
//    }
//}

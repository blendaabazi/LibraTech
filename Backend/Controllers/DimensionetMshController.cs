//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.AspNetCore.Mvc;
//using Lab1_Backend.Models;
//using Microsoft.EntityFrameworkCore;

//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class DimensionetMShController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public DimensionetMShController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Tipi
//        [HttpGet]
//        public ActionResult<IEnumerable<DimensionetMSh>> GetDimensionet()
//        {
//            return _context.DimensionetMSh.ToList();
//        }

//        // GET: api/Tipi/5
//        [HttpGet("{id}")]
//        public ActionResult<DimensionetMSh> GetDimensionet(int id)
//        {
//            var dimensioni = _context.DimensionetMSh.Find(id);

//            if (dimensioni == null)
//            {
//                return NotFound();
//            }

//            return dimensioni;
//        }

//        // POST: api/Tipi
//        [HttpPost]
//        public async Task<ActionResult<DimensionetMSh>> PostDimensionet(DimensionetMSh dimensioni)
//        {
//            _context.DimensionetMSh.Add(dimensioni);
//            await _context.SaveChangesAsync();


//            return CreatedAtAction(nameof(GetDimensionet), new { id = dimensioni.ID }, dimensioni);
//        }
//        [HttpPut]
//        public IActionResult PutTipi(DimensionetMSh dimensioni)
//        {
//            if (dimensioni == null)
//            {
//                return BadRequest("Invalid object.");
//            }



//            _context.Entry(dimensioni).State = EntityState.Modified;
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
//            var dimensioni = _context.DimensionetMSh.Find(id);
//            if (dimensioni == null)
//            {
//                return NotFound();
//            }

//            _context.DimensionetMSh.Remove(dimensioni);
//            _context.SaveChanges();

//            return NoContent();
//        }
//    }
//}

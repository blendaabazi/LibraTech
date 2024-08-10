//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.AspNetCore.Mvc;
//using Lab1_Backend.Models;
//using Microsoft.EntityFrameworkCore;

//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ShtetiMShController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public ShtetiMShController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Tipi
//        [HttpGet]
//        public ActionResult<IEnumerable<ShtetiMSh>> GetShteti()
//        {
//            return _context.ShtetiMSh.ToList();
//        }

//        // GET: api/Tipi/5
//        [HttpGet("{id}")]
//        public ActionResult<ShtetiMSh> GetShteti(int id)
//        {
//            var shteti = _context.ShtetiMSh.Find(id);

//            if (shteti == null)
//            {
//                return NotFound();
//            }

//            return shteti;
//        }

//        // POST: api/Tipi
//        [HttpPost]
//        public async Task<ActionResult<ShtetiMSh>> PostShteti(ShtetiMSh shteti)
//        {
//            _context.ShtetiMSh.Add(shteti);
//            await _context.SaveChangesAsync();


//            return CreatedAtAction(nameof(GetShteti), new { id = shteti.ID }, shteti);
//        }
//        [HttpPut]
//        public IActionResult PutShteti(ShtetiMSh shteti)
//        {
//            if (shteti == null)
//            {
//                return BadRequest("Invalid object.");
//            }



//            _context.Entry(shteti).State = EntityState.Modified;
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
//            var shteti = _context.ShtetiMSh.Find(id);
//            if (shteti == null)
//            {
//                return NotFound();
//            }

//            _context.ShtetiMSh.Remove(shteti);
//            _context.SaveChanges();

//            return NoContent();
//        }
//    }
//}

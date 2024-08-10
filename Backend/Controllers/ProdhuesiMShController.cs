//using System.Collections.Generic;
//using System.Linq;
//using Microsoft.AspNetCore.Mvc;
//using Lab1_Backend.Models;
//using Microsoft.EntityFrameworkCore;

//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class ProdhuesiMShController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public ProdhuesiMShController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Tipi
//        [HttpGet]
//        public ActionResult<IEnumerable<ProdhuesiMSh>> GetProdhuesi()
//        {
//            return _context.ProdhuesiMSh.ToList();
//        }

//        // GET: api/Tipi/5
//        [HttpGet("{id}")]
//        public ActionResult<ProdhuesiMSh> GetProdhuesi(int id)
//        {
//            var prodhuesi = _context.ProdhuesiMSh.Find(id);

//            if (prodhuesi == null)
//            {
//                return NotFound();
//            }

//            return prodhuesi;
//        }

//        // POST: api/Tipi
//        [HttpPost]
//        public async Task<ActionResult<ProdhuesiMSh>> PostProdhuesi(ProdhuesiMSh prodhuesi)
//        {
//            _context.ProdhuesiMSh.Add(prodhuesi);
//            await _context.SaveChangesAsync();


//            return CreatedAtAction(nameof(GetProdhuesi), new { id = prodhuesi.ID }, prodhuesi);
//        }
//        [HttpPut]
//        public IActionResult PutTipi(ProdhuesiMSh prodhuesi)
//        {
//            if (prodhuesi == null)
//            {
//                return BadRequest("Invalid object.");
//            }



//            _context.Entry(prodhuesi).State = EntityState.Modified;
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
//        public IActionResult DeleteProdhuesi(int id)
//        {
//            var prodhuesi = _context.ProdhuesiMSh.Find(id);
//            if (prodhuesi == null)
//            {
//                return NotFound();
//            }

//            _context.ProdhuesiMSh.Remove(prodhuesi);
//            _context.SaveChanges();

//            return NoContent();
//        }
//    }
//}

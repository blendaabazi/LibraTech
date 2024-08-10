//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.AspNetCore.Mvc;
//using Lab1_Backend.Models;
//using Microsoft.EntityFrameworkCore;
//using System.Globalization;

//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class PorosiaController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public PorosiaController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        // GET: api/Porosia
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Porosia>>> GetPorosite()
//        {
//            return await _context.Porosia.ToListAsync();
//        }

//        // GET: api/Porosia/5
//        [HttpGet("{id}")]
//        public async Task<IActionResult> GetPorosia(int id)
//        {
//            var porosia = await _context.Porosia.FindAsync(id);

//            if (porosia == null)
//            {
//                return NotFound();
//            }

//            return Ok(porosia);
//        }

//        public class ShportaItem
//        {
//            public int Klienti { get; set; }
//            public int Id { get; set; }
//            public bool IsBook { get; set; }
//        }

//        // POST: api/Porosia
//        [HttpPost]
//        public async Task<IActionResult> Porosia(List<ShportaItem> resultArray)
//        {

//            try
//            {
//                double cmimiTotal = 0;

//                var produktet = new List<Produkti>();
//                foreach (var item in resultArray)
//                {
//                    if (item.IsBook)
//                    {
//                        var libri = await _context.Libri.FindAsync(item.Id);
//                        if (libri != null)
//                        {
//                            cmimiTotal += libri.Cmimi;
//                            produktet.Add(new Produkti { LibriID = item.Id });
//                        }
//                    }
//                    else
//                    {
//                        var mjet = await _context.MjeteShkollore.FindAsync(item.Id);
//                        if (mjet != null)
//                        {
//                            cmimiTotal += mjet.Cmimi;
//                            produktet.Add(new Produkti { MjeteShkolloreID = item.Id });
//                        }
//                    }
//                }

//                var porosia = new Porosia()
//                {
//                    CmimiTotal = cmimiTotal,
//                    Data = DateTime.Now,
//                    KlientiID = resultArray.Select(e => e.Klienti).FirstOrDefault(),
//                    Produktet = produktet
//                };

//                await _context.Porosia.AddAsync(porosia);
//                await _context.SaveChangesAsync();

//                return Ok("Order processed successfully.");
//            }
//            catch (Exception ex)
//            {
//                // Log the exception (use a logging framework like Serilog, NLog, etc.)
//                return StatusCode(500, "Internal server error: " + ex.Message);
//            }
//        }


//        [HttpGet("CountOnDate/{date}")]
//        public async Task<ActionResult<int>> CountPorositeOnDate(DateTime date)
//        {


//            int numerPorosish = await _context.Porosia
//                .Where(p => EF.Functions.DateDiffDay(p.Data, date) == 0)
//                .CountAsync();

//            return numerPorosish;

//        }
       
//    // DELETE: api/Porosia/5
//    [HttpDelete("{id}")]
//        public async Task<IActionResult> DeletePorosia(int id)
//        {
//            var porosia = await _context.Porosia.FindAsync(id);

//            if (porosia == null)
//            {
//                return NotFound();
//            }

//            _context.Porosia.Remove(porosia);
//            await _context.SaveChangesAsync();

//            return NoContent();
//        }
//        [HttpGet("TopProducts")]
//        public async Task<ActionResult<IEnumerable<object>>> GetTopProducts()
//        {
//            var topLibra = await _context.Produkti
//                .Where(p => p.LibriID != null)
//                .GroupBy(p => new { p.LibriID, p.Libri.Titulli })
//                .Select(g => new
//                {
//                    ProduktID = g.Key.LibriID,
//                    EmriProduktit = g.Key.Titulli,
//                    NumriShitjeve = g.Count()

//                })
//                .ToListAsync();

//            var topMjete = await _context.Produkti
//                .Where(p => p.MjeteShkolloreID != null)
//                .GroupBy(p => new { p.MjeteShkolloreID, p.MjeteShkollore.Tipi })
//                .Select(g => new
//                {
//                    ProduktID = g.Key.MjeteShkolloreID,
//                    EmriProduktit = g.Key.Tipi,
//                    NumriShitjeve = g.Count()
//                })
//                .ToListAsync();

//            var topProducts = topLibra.Concat(topMjete)
//                .OrderByDescending(p => p.NumriShitjeve)
//                .ToList();

//            return Ok(topProducts);
//        }
//    }
//}

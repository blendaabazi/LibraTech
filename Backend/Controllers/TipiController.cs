using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using Lab1_Backend.Models;
using Microsoft.EntityFrameworkCore;


namespace Lab1_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TipiController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public TipiController(LibrariaContext context)
        {
            _context = context;
        }

        // GET: api/Kategoria
        [HttpGet]
        public ActionResult<IEnumerable<Tipi>> GetTipi()
        {
            return _context.Tipi.ToList();
        }

        // GET: api/Kategoria/5
        [HttpGet("{id}")]
        public ActionResult<Tipi> GetTipi(int id)
        {
            var k = _context.Tipi.Find(id);

            if (k == null)
            {
                return NotFound();
            }

            return k;
        }



        // POST: api/Kategoria
        [HttpPost]
        public async Task<ActionResult<Tipi>> PostTipi(Tipi t)
        {
            _context.Tipi.Add(t);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetTipi), new { id = t.TipiID }, t);
        }
        [HttpPut]
        public IActionResult PutTipi(Tipi t)
        {
            if (t == null)
            {
                return BadRequest("Invalid object.");
            }



            _context.Entry(t).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return NoContent();
        }


        // DELETE: api/Tipi/5
        [HttpDelete("{id}")]
        public IActionResult DeleteTipi(int id)
        {
            var k = _context.Tipi.Find(id);
            if (k == null)
            {
                return NotFound();
            }

            _context.Tipi.Remove(k);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


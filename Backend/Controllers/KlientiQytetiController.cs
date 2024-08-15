/*using Lab1_Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Lab1_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class KlientiQytetiController : ControllerBase
    {
        private readonly LibrariaContext _dbContext;
        public KlientiQytetiController(LibrariaContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<KlientiQyteti>>> GetKlientiQytetiList()
        {
            var klientiqytetiList = await _dbContext.KlientiQyteti.ToListAsync();
            if (klientiqytetiList == null || !klientiqytetiList.Any())
            {
                return NotFound();
            }
            return Ok(klientiqytetiList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<KlientiQyteti>> GetKlientiQyteti(int id)
        {
            var klientiqyteti = await _dbContext.KlientiQyteti.FindAsync(id);
            if (klientiqyteti == null)
            {
                return NotFound();
            }
            return Ok(klientiqyteti);
        }

        [HttpPost]
        public async Task<ActionResult<KlientiQyteti>> PostKlientiQyteti(KlientiQyteti klientiqyteti)
        {
            _dbContext.KlientiQyteti.Add(klientiqyteti);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetKlientiQyteti), new { id = klientiqyteti.Id }, klientiqyteti);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutQyteti(int id, KlientiQyteti klientiqyteti)
        {
            if (id != klientiqyteti.Id)
            {
                return BadRequest();
            }
            _dbContext.Entry(klientiqyteti).State = EntityState.Modified;
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KlientiQytetiExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteKlientiQyteti(int id)
        {
            var klientiqyteti = await _dbContext.KlientiQyteti.FindAsync(id);
            if (klientiqyteti == null)
            {
                return NotFound();
            }
            _dbContext.KlientiQyteti.Remove(klientiqyteti);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        private bool KlientiQytetiExists(int id)
        {
            return _dbContext.KlientiQyteti.Any(e => e.Id == id);
        }
    }
}
*/
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
    public class KlientiQytetiController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public KlientiQytetiController(LibrariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<KlientiQyteti>> GetKlientiQyteti()
        {
            return _context.KlientiQyteti.ToList();
        }


        [HttpGet("{id}")]
        public ActionResult<KlientiQyteti> GetKlientiQyteti(int id)
        {
            var gj = _context.KlientiQyteti.Find(id);

            if (gj == null)
            {
                return NotFound();
            }

            return gj;
        }




        [HttpPost]
        public async Task<ActionResult<KlientiQyteti>> PostKlientiQyteti(KlientiQyteti s)
        {
            _context.KlientiQyteti.Add(s);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetKlientiQyteti), new { id = s.KlientiQytetiID }, s);
        }
        [HttpPut]
        public IActionResult PutKlientiQyteti(KlientiQyteti s)
        {
            if (s == null)
            {
                return BadRequest("Invalid object.");
            }



            _context.Entry(s).State = EntityState.Modified;
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


        [HttpDelete("{id}")]
        public IActionResult DeleteKlientiQyteti(int id)
        {
            var gj = _context.KlientiQyteti.Find(id);
            if (gj == null)
            {
                return NotFound();
            }

            _context.KlientiQyteti.Remove(gj);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


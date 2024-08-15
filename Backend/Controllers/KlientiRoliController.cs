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
    public class KlientiRoliController : ControllerBase
    {
        private readonly LibrariaContext _dbContext;

        public KlientiRoliController(LibrariaContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<KlientiRoli>>> GetKlientiRoliList()
        {
            var klientiroliList = await _dbContext.KlientiRoli.ToListAsync();
            if (klientiroliList == null || !klientiroliList.Any())
            {
                return NotFound();
            }
            return Ok(klientiroliList);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<KlientiRoli>> GetKlientiRoli(int id)
        {
            var klientiroli = await _dbContext.KlientiRoli.FindAsync(id);
            if (klientiroli == null)
            {
                return NotFound();
            }
            return Ok(klientiroli);
        }

        [HttpPost]
        public async Task<ActionResult<KlientiRoli>> PostRoli(KlientiRoli klientiroli)
        {
            _dbContext.KlientiRoli.Add(klientiroli);
            await _dbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetKlientiRoli), new { id = klientiroli.Id }, klientiroli);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutRoli(int id, KlientiRoli klientiroli)
        {
            if (id != klientiroli.Id)
            {
                return BadRequest();
            }
            _dbContext.Entry(klientiroli).State = EntityState.Modified;
            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KlientiRoliExists(id))
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
        public async Task<IActionResult> DeleteKlientiRoli(int id)
        {
            var klientiroli = await _dbContext.KlientiRoli.FindAsync(id);
            if (klientiroli == null)
            {
                return NotFound();
            }
            _dbContext.KlientiRoli.Remove(klientiroli);
            await _dbContext.SaveChangesAsync();
            return NoContent();
        }

        private bool KlientiRoliExists(int id)
        {
            return _dbContext.KlientiRoli.Any(e => e.Id == id);
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
    public class KlientiRoliController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public KlientiRoliController(LibrariaContext context)
        {
            _context = context;
        }

        [HttpGet]
        public ActionResult<IEnumerable<KlientiRoli>> GetKlientiRoli()
        {
            return _context.KlientiRoli.ToList();
        }


        [HttpGet("{id}")]
        public ActionResult<KlientiRoli> GetKlientiRoli(int id)
        {
            var gj = _context.KlientiRoli.Find(id);

            if (gj == null)
            {
                return NotFound();
            }

            return gj;
        }




        [HttpPost]
        public async Task<ActionResult<KlientiRoli>> PostKlientiRoli(KlientiRoli s)
        {
            _context.KlientiRoli.Add(s);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetKlientiRoli), new { id = s.KlientiRoliID }, s);
        }
        [HttpPut]
        public IActionResult PutKlientiRoli(KlientiRoli s)
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
        public IActionResult DeleteKlientiRoli(int id)
        {
            var gj = _context.KlientiRoli.Find(id);
            if (gj == null)
            {
                return NotFound();
            }

            _context.KlientiRoli.Remove(gj);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


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
    public class KategoriaController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public KategoriaController(LibrariaContext context)
        {
            _context = context;
        }

        // GET: api/Kategoria
        [HttpGet]
        public ActionResult<IEnumerable<Kategoria>> GetKategoria()
        {
            return _context.Kategoria.ToList();
        }

        // GET: api/Kategoria/5
        [HttpGet("{id}")]
        public ActionResult<Kategoria> GetKategoria(int id)
        {
            var k = _context.Kategoria.Find(id);

            if (k == null)
            {
                return NotFound();
            }

            return k;
        }



        // POST: api/Kategoria
        [HttpPost]
        public async Task<ActionResult<Kategoria>> PostKategoria(Kategoria kategoria)
        {
            _context.Kategoria.Add(kategoria);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetKategoria), new { id = kategoria.KategoriaID }, kategoria);
        }
        [HttpPut]
        public IActionResult PutKategoria(Kategoria kategoria) 
        {
            if (kategoria == null)
            {
                return BadRequest("Invalid object.");
            }

           

            _context.Entry(kategoria).State = EntityState.Modified;
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


        // DELETE: api/Kategoria/5
        [HttpDelete("{id}")]
        public IActionResult DeleteKategoria(int id)
        {
            var k = _context.Kategoria.Find(id);
            if (k == null)
            {
                return NotFound();
            }

            _context.Kategoria.Remove(k);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


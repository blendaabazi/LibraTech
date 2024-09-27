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
using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;


namespace Lab1_Backend.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class KategoriaController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public KategoriaController(LibrariaContext context)
        {
            _context = context;
        }

        // GET: api/Kategoria
        [AllowAnonymous]
        [HttpGet]
        public ActionResult<IEnumerable<Kategoria>> GetKategoria()
        {
            return _context.Kategoria.ToList();
        }

        //GET: api/Kategoria/5
        [AllowAnonymous]
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
        [Authorize(Policy = "AdminOnly")]
        [HttpPost]
        public async Task<ActionResult<Kategoria>> PostKategoria(Kategoria kategoria)
        {
            _context.Kategoria.Add(kategoria);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetKategoria), new { id = kategoria.KategoriaID }, kategoria);
        }
       
        [HttpPut]
        [Authorize(Policy = "AdminOnly")]

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
        [Authorize(Policy = "AdminOnly")]

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


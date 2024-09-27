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


namespace Lab1_Backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GjuhaController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public GjuhaController(LibrariaContext context)
        {
            _context = context;
        }

        // GET: api/Gjuha
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<Gjuha>> GetGjuha()
        {
            return _context.Gjuha.ToList();
        }

        // GET: api/Gjuha/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult<Gjuha> GetGjuha(int id)
        {
            var gj = _context.Gjuha.Find(id);

            if (gj == null)
            {
                return NotFound();
            }

            return gj;
        }



        // POST: api/Gjuha
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<Gjuha>> PostGjuha(Gjuha gjuha)
        {
            _context.Gjuha.Add(gjuha);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetGjuha), new { id = gjuha.GjuhaID }, gjuha);
        }
        [HttpPut]
        [Authorize(Policy = "AdminOnly")]

        public IActionResult PutGjuha(Gjuha gjuha)
        {
            if (gjuha == null)
            {
                return BadRequest("Invalid object.");
            }

           

            _context.Entry(gjuha).State = EntityState.Modified;
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


        // DELETE: api/Gjuha/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public IActionResult DeleteGjuha(int id)
        {
            var gj = _context.Gjuha.Find(id);
            if (gj == null)
            {
                return NotFound();
            }

            _context.Gjuha.Remove(gj);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


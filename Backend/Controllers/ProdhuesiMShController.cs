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
    public class ProdhuesiMShController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public ProdhuesiMShController(LibrariaContext context)
        {
            _context = context;
        }

        // GET: api/ProdhuesiMSh
        [HttpGet]
        public ActionResult<IEnumerable<ProdhuesiMSh>> GetProdhuesiMSh()
        {
            return _context.ProdhuesiMSh.ToList();
        }

        // GET: ap//5
        [HttpGet("{id}")]
        public ActionResult<ProdhuesiMSh> GetProdhuesiMSh(int id)
        {
            var gj = _context.ProdhuesiMSh.Find(id);

            if (gj == null)
            {
                return NotFound();
            }

            return gj;
        }



        // POST: api/Gjuha
        [HttpPost]
        public async Task<ActionResult<ProdhuesiMSh>> PostProdhuesi(ProdhuesiMSh p)
        {
            _context.ProdhuesiMSh.Add(p);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetProdhuesiMSh), new { id = p.ProdhuesiMShID }, p);
        }
        [HttpPut]
        public IActionResult PutProdhuesiMSH(ProdhuesiMSh p)
        {
            if (p == null)
            {
                return BadRequest("Invalid object.");
            }



            _context.Entry(p).State = EntityState.Modified;
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
        public IActionResult DeleteProdhuesiMSH(int id)
        {
            var gj = _context.ProdhuesiMSh.Find(id);
            if (gj == null)
            {
                return NotFound();
            }

            _context.ProdhuesiMSh.Remove(gj);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


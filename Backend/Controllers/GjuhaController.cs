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
using System.Security.Claims;
using Backend.Models;


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
            var auditLog = new AuditLog
            {
                Action = "Shtoi",
                Entity = "Gjuha",
                EntityId = gjuha.GjuhaID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
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
                var auditLog = new AuditLog
                {
                    Action = "Ndryshoi",
                    Entity = "Gjuha",
                    EntityId = gjuha.GjuhaID,
                    PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                    PerformedAt = DateTime.Now
                };

                _context.AuditLogs.Add(auditLog);
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
            var auditLog = new AuditLog
            {
                Action = "Fshir",
                Entity = "Gjuha",
                EntityId = gj.GjuhaID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


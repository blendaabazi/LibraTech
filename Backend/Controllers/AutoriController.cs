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
    public class AutoriController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public AutoriController(LibrariaContext context)
        {
            _context = context;
        }

        // GET: api/Autori
        [HttpGet]
        [AllowAnonymous]

        public ActionResult<IEnumerable<Autori>> GetAutori()
        {
            return _context.Autori.ToList();
        }

        // GET: api/Autori/5
        [HttpGet("{id}")]
        [AllowAnonymous]

        public ActionResult<Autori> GetAutori(int id)
        {
            var autori = _context.Autori.Find(id);

            if (autori == null)
            {
                return NotFound();
            }

            return autori;
        }
      


        // POST: api/Autori
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]
        public async Task<ActionResult<Autori>> PostAutori(Autori autori)
        {
            _context.Autori.Add(autori);
            await _context.SaveChangesAsync();

            // Log the addition action in AuditLog
            var auditLog = new AuditLog
            {
                Action = "Shtoi",
                Entity = "Autori",
                EntityId = autori.AutoriID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetAutori), new { id = autori.AutoriID }, autori);
        }
        [HttpPut]
        [Authorize(Policy = "AdminOnly")]

        public IActionResult PutAutori(Autori autori)
        {
            if (autori == null)
            {
                return BadRequest("Invalid object.");
            }

            // Nëse duhet, bëni validime të tjera për të dhënat e 'autori'

            _context.Entry(autori).State = EntityState.Modified;
            try
            {
                _context.SaveChanges();
                var auditLog = new AuditLog
                {
                    Action = "Ndryshoi",
                    Entity = "Autori",
                    EntityId = autori.AutoriID,
                    PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                    PerformedAt = DateTime.Now
                };

                _context.AuditLogs.Add(auditLog);
            }
            catch (DbUpdateConcurrencyException)
            {
                throw;
            }
            return NoContent();
        }


        // DELETE: api/autori/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public IActionResult DeleteAutori(int id)
        {
            var autori = _context.Autori.Find(id);
            if (autori == null)
            {
                return NotFound();
            }

            _context.Autori.Remove(autori);
            var auditLog = new AuditLog
            {
                Action = "Fshir",
                Entity = "Autori",
                EntityId = autori.AutoriID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

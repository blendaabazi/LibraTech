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

    public class ShtepiaBotueseController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public ShtepiaBotueseController(LibrariaContext context)
        {
            _context = context;
        }

        // GET: api/ShtepiaBotuese
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<ShtepiaBotuese>> GetAutori()
        {
            return _context.ShtepiaBotuese.ToList();
        }

        // GET: api/Autori/5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult<ShtepiaBotuese> GetShtepiaBotuese(int id)
        {
            var sh = _context.ShtepiaBotuese.Find(id);

            if (sh == null)
            {
                return NotFound();
            }

            return sh;
        }



        // POST: api/ShtepiaBotuese
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<ShtepiaBotuese>> PostShtepiaBotuese(ShtepiaBotuese sh)
        {
            _context.ShtepiaBotuese.Add(sh);
            var auditLog = new AuditLog
            {
                Action = "Shtoi",
                Entity = "Shtepia Botuese",
                EntityId = sh.ShtepiaBotueseID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetShtepiaBotuese), new { id = sh.ShtepiaBotueseID }, sh);
        }
        [HttpPut]
        [Authorize(Policy = "AdminOnly")]

        public IActionResult PutShtepiaBotuese(ShtepiaBotuese sh)
        {
            if (sh == null)
            {
                return BadRequest("Invalid object.");
            }

       

            _context.Entry(sh).State = EntityState.Modified;
            try
            {
                var auditLog = new AuditLog
                {
                    Action = "Ndryshoi",
                    Entity = "Shtepia Botuese",
                    EntityId = sh.ShtepiaBotueseID,
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


      
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public IActionResult DeleteShtepiaBotuese(int id)
        {
            var sh = _context.ShtepiaBotuese.Find(id);
            if (sh == null)
            {
                return NotFound();
            }

            _context.ShtepiaBotuese.Remove(sh);
            var auditLog = new AuditLog
            {
                Action = "Fshir",
                Entity = "Shtepia Botuese",
                EntityId = sh.ShtepiaBotueseID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
            _context.SaveChanges();

            return NoContent();
        }
    }
}

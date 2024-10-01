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
    public class ShtetiMShController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public ShtetiMShController(LibrariaContext context)
        {
            _context = context;
        }

        // GET: api/ShtetiMSh
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<ShtetiMSh>> GetShtetiMSh()
        {
            return _context.ShtetiMSh.ToList();
        }

        // GET: ap//5
        [HttpGet("{id}")]
        [AllowAnonymous]
        public ActionResult<ShtetiMSh> GetShtetiMSh(int id)
        {
            var gj = _context.ShtetiMSh.Find(id);

            if (gj == null)
            {
                return NotFound();
            }

            return gj;
        }



        // POST: api/ShtetiMSh
        [HttpPost]
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<ShtetiMSh>> PostShtetiMSh(ShtetiMSh p)
        {
            _context.ShtetiMSh.Add(p);
            var auditLog = new AuditLog
            {
                Action = "Shtoi",
                Entity = "Shtetin",
                EntityId = p.ShtetiMShID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetShtetiMSh), new { id = p.ShtetiMShID }, p);
        }
        [HttpPut]
        [Authorize(Policy = "AdminOnly")]

        public IActionResult PutShtetiMSH(ShtetiMSh p)
        {
            if (p == null)
            {
                return BadRequest("Invalid object.");
            }



            _context.Entry(p).State = EntityState.Modified;
            try
            {
                var auditLog = new AuditLog
                {
                    Action = "Ndryshoi",
                    Entity = "Shtetin",
                    EntityId = p.ShtetiMShID,
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


        // DELETE: api/ShtetiMSh/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]

        public IActionResult DeleteShtetiMSh(int id)
        {
            var gj = _context.ShtetiMSh.Find(id);
            if (gj == null)
            {
                return NotFound();
            }

            _context.ShtetiMSh.Remove(gj);
            var auditLog = new AuditLog
            {
                Action = "Fshir",
                Entity = "Shtetin",
                EntityId = gj.ShtetiMShID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


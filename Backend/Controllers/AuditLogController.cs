namespace Backend.Controllers
{
    using Backend.Models;
    using global::Lab1_Backend.Models;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;

    namespace Lab1_Backend.Controllers
    {
        [Route("api/[controller]")]
        [ApiController]
        [Authorize(Policy = "AdminOnly")] // Vetëm adminët mund të aksesojnë këtë informacion
        public class AuditLogController : ControllerBase
        {
            private readonly LibrariaContext _context;

            public AuditLogController(LibrariaContext context)
            {
                _context = context;
            }

            // GET: api/AuditLog
            [HttpGet]
            public async Task<ActionResult<IEnumerable<AuditLog>>> GetAuditLogs()
            {
                try
                {
                    var auditLogs = await _context.AuditLogs
                        .OrderByDescending(a => a.PerformedAt) // Rendi zbritës sipas kohës së veprimit
                        .ToListAsync();

                    if (auditLogs == null || !auditLogs.Any())
                    {
                        return NotFound("Nuk u gjetën audit logs.");
                    }

                    return Ok(auditLogs);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }

            // GET: api/AuditLog/{id}
            [HttpGet("{id}")]
            public async Task<ActionResult<AuditLog>> GetAuditLog(int id)
            {
                try
                {
                    var auditLog = await _context.AuditLogs.FindAsync(id);

                    if (auditLog == null)
                    {
                        return NotFound($"AuditLog me ID = {id} nuk u gjet.");
                    }

                    return Ok(auditLog);
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }
            // DELETE: api/AuditLog/{id}
            [HttpDelete("{id}")]
            public async Task<IActionResult> DeleteAuditLog(int id)
            {
                try
                {
                    var auditLog = await _context.AuditLogs.FindAsync(id);
                    if (auditLog == null)
                    {
                        return NotFound($"AuditLog with ID = {id} was not found.");
                    }

                    _context.AuditLogs.Remove(auditLog);
                    await _context.SaveChangesAsync();

                    return Ok($"AuditLog with ID = {id} has been deleted.");
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }

            // DELETE: api/AuditLog/deleteAll
            [HttpDelete("deleteAll")]
            public async Task<IActionResult> DeleteAllAuditLogs()
            {
                try
                {
                    var allAuditLogs = await _context.AuditLogs.ToListAsync();

                    if (allAuditLogs == null || !allAuditLogs.Any())
                    {
                        return NotFound("No audit logs found to delete.");
                    }

                    _context.AuditLogs.RemoveRange(allAuditLogs);
                    await _context.SaveChangesAsync();

                    return Ok("All audit logs have been deleted.");
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Internal server error: {ex.Message}");
                }
            }
        }
    }

}

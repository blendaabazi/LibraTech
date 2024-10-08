﻿using Microsoft.AspNetCore.Http;
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
    public class ProdhuesiMShController : ControllerBase
    {
        private readonly LibrariaContext _context;

        public ProdhuesiMShController(LibrariaContext context)
        {
            _context = context;
        }

        // GET: api/ProdhuesiMSh
        [HttpGet]
        [AllowAnonymous]
        public ActionResult<IEnumerable<ProdhuesiMSh>> GetProdhuesiMSh()
        {
            return _context.ProdhuesiMSh.ToList();
        }

        // GET: ap//5
        [HttpGet("{id}")]
        [AllowAnonymous]
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
        [Authorize(Policy = "AdminOnly")]

        public async Task<ActionResult<ProdhuesiMSh>> PostProdhuesi(ProdhuesiMSh p)
        {
            _context.ProdhuesiMSh.Add(p);
            var auditLog = new AuditLog
            {
                Action = "Shtoi",
                Entity = "Prodhuesi",
                EntityId = p.ProdhuesiMShID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
            await _context.SaveChangesAsync();


            return CreatedAtAction(nameof(GetProdhuesiMSh), new { id = p.ProdhuesiMShID }, p);
        }
        [HttpPut]
        [Authorize(Policy = "AdminOnly")]

        public IActionResult PutProdhuesiMSH(ProdhuesiMSh p)
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
                    Entity = "Prodhuesi",
                    EntityId = p.ProdhuesiMShID,
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

        public IActionResult DeleteProdhuesiMSH(int id)
        {
            var gj = _context.ProdhuesiMSh.Find(id);
            if (gj == null)
            {
                return NotFound();
            }

            _context.ProdhuesiMSh.Remove(gj);
            var auditLog = new AuditLog
            {
                Action = "Fshir",
                Entity = "Prodhuesi",
                EntityId = gj.ProdhuesiMShID,
                PerformedBy = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value,
                PerformedAt = DateTime.Now
            };

            _context.AuditLogs.Add(auditLog);
            _context.SaveChanges();

            return NoContent();
        }
    }
}


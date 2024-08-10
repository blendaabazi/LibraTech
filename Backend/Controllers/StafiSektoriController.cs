//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using System.Data;
//using System.Data.SqlClient;
//using Microsoft.Extensions.Configuration;
//using Lab1_Backend.Models;
//using Microsoft.EntityFrameworkCore;


//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class StafiSektoriController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public StafiSektoriController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        [HttpGet]
//        public ActionResult<IEnumerable<StafiSektori>> GetStafiSektori()
//        {
//            return _context.StafiSektori.ToList();
//        }


//        [HttpGet("{id}")]
//        public ActionResult<StafiSektori> GetStafiSektori(int id)
//        {
//            var gj = _context.StafiSektori.Find(id);

//            if (gj == null)
//            {
//                return NotFound();
//            }

//            return gj;
//        }




//        [HttpPost]
//        public async Task<ActionResult<StafiSektori>> PostStafiSektori(StafiSektori s)
//        {
//            _context.StafiSektori.Add(s);
//            await _context.SaveChangesAsync();


//            return CreatedAtAction(nameof(GetStafiSektori), new { id = s.Id }, s);
//        }
//        [HttpPut]
//        public IActionResult PutStafiSektori(StafiSektori s)
//        {
//            if (s == null)
//            {
//                return BadRequest("Invalid object.");
//            }



//            _context.Entry(s).State = EntityState.Modified;
//            try
//            {
//                _context.SaveChanges();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                throw;
//            }
//            return NoContent();
//        }


//        [HttpDelete("{id}")]
//        public IActionResult DeleteStafiSektori(int id)
//        {
//            var gj = _context.StafiSektori.Find(id);
//            if (gj == null)
//            {
//                return NotFound();
//            }

//            _context.StafiSektori.Remove(gj);
//            _context.SaveChanges();

//            return NoContent();
//        }
//    }
//}


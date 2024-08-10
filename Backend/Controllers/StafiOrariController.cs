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
//    public class StafiOrariController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public StafiOrariController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        [HttpGet]
//        public ActionResult<IEnumerable<StafiOrari>> GetStafiOrari()
//        {
//            return _context.StafiOrari.ToList();
//        }

   
//        [HttpGet("{id}")]
//        public ActionResult<StafiOrari> GetStafiOrari(int id)
//        {
//            var gj = _context.StafiOrari.Find(id);

//            if (gj == null)
//            {
//                return NotFound();
//            }

//            return gj;
//        }



    
//        [HttpPost]
//        public async Task<ActionResult<StafiOrari>> PostStafiOrari(StafiOrari s)
//        {
//            _context.StafiOrari.Add(s);
//            await _context.SaveChangesAsync();


//            return CreatedAtAction(nameof(GetStafiOrari), new { id = s.Id }, s);
//        }
//        [HttpPut]
//        public IActionResult PutStafiOrari(StafiOrari s)
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
//        public IActionResult DeleteStafiOrari(int id)
//        {
//            var gj = _context.StafiOrari.Find(id);
//            if (gj == null)
//            {
//                return NotFound();
//            }

//            _context.StafiOrari.Remove(gj);
//            _context.SaveChanges();

//            return NoContent();
//        }
//    }
//}


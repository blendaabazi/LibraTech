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
//    public class StafiGjiniaController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public StafiGjiniaController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        [HttpGet]
//        public ActionResult<IEnumerable<StafiGjinia>> GetStafiGjinia()
//        {
//            return _context.StafiGjinia.ToList();
//        }

//        [HttpGet("{id}")]
//        public ActionResult<StafiGjinia> GetStafiGjinia(int id)
//        {
//            var gj = _context.StafiGjinia.Find(id);

//            if (gj == null)
//            {
//                return NotFound();
//            }

//            return gj;
//        }



    
//        [HttpPost]
//        public async Task<ActionResult<StafiGjinia>> PostStafiGjinia(StafiGjinia s)
//        {
//            _context.StafiGjinia.Add(s);
//            await _context.SaveChangesAsync();


//            return CreatedAtAction(nameof(GetStafiGjinia), new { id = s.Id }, s);
//        }
//        [HttpPut]
//        public IActionResult PutStafiGjinia(StafiGjinia s)
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
//        public IActionResult DeleteStafiGjinia(int id)
//        {
//            var s = _context.StafiGjinia.Find(id);
//            if (s == null)
//            {
//                return NotFound();
//            }

//            _context.StafiGjinia.Remove(s);
//            _context.SaveChanges();

//            return NoContent();
//        }
//    }
//}


//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using Lab1_Backend.Models;
//using System.Collections.Generic;
//using System.Threading.Tasks;

//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class StafiController : ControllerBase
//    {
//        private readonly LibrariaContext _stafi;
//        private readonly IWebHostEnvironment _env;

//        public StafiController(LibrariaContext stafi, IWebHostEnvironment env)
//        {
//            _stafi = stafi;
//            _env = env;
//        }
//        [HttpGet]
//        public async Task<ActionResult<IEnumerable<Stafi>>> GetStafi()
//        {
//            if (_stafi == null)
//            {
//                return NotFound();
//            }
//            return await _stafi.Stafi.ToListAsync();
//        }
//        [HttpGet("{id}")]
//        public async Task<ActionResult<Stafi>> GetStafi(int id)
//        {
//            var s = await _stafi.Stafi.FindAsync(id);
//            if (s == null)
//            {
//                return NotFound();
//            }
//            return s;
//        }

//        [HttpPost]
//        public async Task<ActionResult<Stafi>> PostStafi(Stafi s)
//        {
//            _stafi.Stafi.Add(s);
//            await _stafi.SaveChangesAsync();

//            return CreatedAtAction(nameof(GetStafi), new { id = s.IDStafi }, s);
//        }


//        [HttpPut]
//        public async Task<ActionResult> PutStafi(Stafi s)
//        {
//            if (s == null || s.IDStafi == 0)
//            {
//                return BadRequest("Invalid object or ID.");
//            }

//            _stafi.Entry(s).State = EntityState.Modified;
//            try
//            {
//                await _stafi.SaveChangesAsync();
//            }
//            catch (DbUpdateConcurrencyException)
//            {
//                throw;
//            }
//            return Ok();
//        }
//        [HttpGet("TotalStafi")]
//        public async Task<ActionResult<int>> GetTotalStafi()
//        {
//            var total = await _stafi.Stafi.CountAsync();
//            return total;
//        }

//        [HttpDelete("{id}")]
//        public async Task<ActionResult> DeleteStafi(int id)
//        {
//            if (_stafi.Stafi == null)
//            {
//                return NotFound();
//            }
//            var s = await _stafi.Stafi.FindAsync(id);
//            if (s == null)
//            {
//                return NotFound();
//            }
//            _stafi.Stafi.Remove(s);
//            await _stafi.SaveChangesAsync();
//            return Ok();
//        }

//        private bool StafiExists(int id)
//        {
//            return _stafi.Stafi.Any(e => e.IDStafi == id);
//        }


//    }

//}


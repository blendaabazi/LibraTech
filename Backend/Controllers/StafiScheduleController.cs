//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Collections.Generic;
//using System.Linq;
//using System.Threading.Tasks;
//using Microsoft.EntityFrameworkCore;
//using Lab1_Backend.Models;


//namespace Lab1_Backend.Controllers
//{
//    [Route("api/[controller]")]
//    [ApiController]
//    public class StafiScheduleController : ControllerBase
//    {
//        private readonly LibrariaContext _context;

//        public StafiScheduleController(LibrariaContext context)
//        {
//            _context = context;
//        }

//        [HttpGet]
//        public ActionResult<IEnumerable<StafiSchedule>> GetStafiSchedule()
//        {
//            return _context.StafiSchedule.ToList();
//        }

//        [HttpGet("{id}")]
//        public ActionResult<StafiSchedule> GetStafiSchedule(int id)
//        {
//            var stafiSchedule = _context.StafiSchedule.Find(id);

//            if (stafiSchedule == null)
//            {
//                return NotFound();
//            }

//            return stafiSchedule;
//        }

//        [HttpPost]
//        public async Task<ActionResult<StafiSchedule>> PostStafiSchedule(StafiSchedule stafiSchedule)
//        {
//            _context.StafiSchedule.Add(stafiSchedule);
//            await _context.SaveChangesAsync();

//            return CreatedAtAction(nameof(GetStafiSchedule), new { id = stafiSchedule.Id }, stafiSchedule);
//        }

//        [HttpPut]
//        public IActionResult PutStaffSchedule(StafiSchedule stafiSchedule)
//        {
//            if (stafiSchedule == null)
//            {
//                return BadRequest("Invalid object.");
//            }

//            _context.Entry(stafiSchedule).State = EntityState.Modified;
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
//        public IActionResult DeleteStafiSchedule(int id)
//        {
//            var stafiSchedule = _context.StafiSchedule.Find(id);
//            if (stafiSchedule == null)
//            {
//                return NotFound();
//            }

//            _context.StafiSchedule.Remove(stafiSchedule);
//            _context.SaveChanges();

//            return NoContent();
//        }
//    }
//}

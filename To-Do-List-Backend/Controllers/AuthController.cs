using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using To_Do_List_Backend.Data;
using To_Do_List_Backend.Dtos;
using To_Do_List_Backend.Models;

namespace To_Do_List_Backend.Controllers
{
    [Route("[controller]")]
    public class AuthController : ControllerBase
    {

        private readonly TaskDataContext _context;

        public AuthController(TaskDataContext context)
    {
        _context = context;
    }


        public async Task<IActionResult>  Login([FromBody] LoginRequestDto login)
        {

            var user = _context.Users.FirstOrDefault((x) => x.email == login.email);

            if (user != null)
            {
                var passwordhasher = new PasswordHasher<UserModel>();
                var result = passwordhasher.VerifyHashedPassword(user, user.password, login.password);
                if (result == PasswordVerificationResult.Failed)
                {
                    return Unauthorized();
                }
                else
                {
                    
                }
            }
            else
            {
                return NotFound("Usuário não encontrado");
            }

            
            
        }

           public async Task<IActionResult> Register([FromBody] UserModel user)
        {
           var RegisterRequest = _context.Users.FirstOrDefaultAsync((x) => x.email == user.email);
           if (RegisterRequest != null)
            {
                return Conflict("Usuário já cadastrado!");
            }
            else
            {
           var passwordhasher = new PasswordHasher<UserModel>();
           user.password =  passwordhasher.HashPassword(user, user.password);
           await _context.Users.AddAsync(user);
           return Ok();
            }
            
        }


    }
}
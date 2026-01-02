using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using To_Do_List_Backend.Data;
using To_Do_List_Backend.Dtos;
using To_Do_List_Backend.Models;
using To_Do_List_Backend.services;

namespace To_Do_List_Backend.Controllers
{

    public class AuthController : ControllerBase
    {

        private readonly TaskDataContext _context;

        private readonly TokenService _tokenservice;

        public AuthController(TaskDataContext context, TokenService tokenservice)
    {
        _context = context;
        _tokenservice = tokenservice;
    }
         [AllowAnonymous]
         [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto login)
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
                   var token = _tokenservice.GenerateToken(user);
                   return Ok(new { token});
                }
            }
            else
            {
                return NotFound("Usuário não encontrado");
            }

        }

           [HttpPost("register")]
           public async Task<IActionResult> Register([FromBody] UserModel user)
        {
           var RegisterRequest = await _context.Users.FirstOrDefaultAsync((x) => x.email == user.email);
           if (RegisterRequest != null)
            {
                return Conflict("Usuário já cadastrado!");
            }
            else
            {
           var passwordhasher = new PasswordHasher<UserModel>();
           user.password =  passwordhasher.HashPassword(user, user.password);
           await _context.Users.AddAsync(user);
           await _context.SaveChangesAsync();
           return Ok();
            }
            
        }


    }
}
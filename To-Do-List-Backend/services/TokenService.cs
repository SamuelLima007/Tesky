using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using To_Do_List_Backend.Models;

namespace To_Do_List_Backend.services
{
    public class TokenService
    {

       
       public string GenerateToken(UserModel user)

        {
             var handler = new JwtSecurityTokenHandler();

            var apikey = Environment.GetEnvironmentVariable("API_KEY");
            var key = Encoding.UTF8.GetBytes(apikey);
            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature);

            var tokendescriptor = new SecurityTokenDescriptor
            {
                Subject = GenerateClaims(user),
                SigningCredentials = credentials,
                Expires = DateTime.UtcNow.AddHours(8)
            };

            var token = handler.CreateToken(tokendescriptor);

            var srtToken = handler.WriteToken(token);
            return srtToken;
        }

         private static ClaimsIdentity GenerateClaims(UserModel user)
        {
            var ci = new ClaimsIdentity();
            ci.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.id.ToString())); 
            return ci;

        }
    }
}
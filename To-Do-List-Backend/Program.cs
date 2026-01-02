using System.Text;
using DotNetEnv;
using IdGen;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using To_Do_List_Backend.Data;
using To_Do_List_Backend.services;

Env.Load();

var builder = WebApplication.CreateBuilder(args);



builder.Services.AddTransient<TokenService>();

builder.Services.AddOpenApi(); 
builder.Services.AddDbContext<TaskDataContext>(options =>
    options.UseSqlite("Data Source=Tasks.db"));
builder.Services.AddControllers();

var apiKey = Environment.GetEnvironmentVariable("API_KEY");
var key = Encoding.UTF8.GetBytes(apiKey);

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(key),
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true
        };
    });
    


builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOriginPolicy",
        policy =>
        {
            policy.AllowAnyOrigin()   
                  .AllowAnyMethod()  
                  .AllowAnyHeader(); 
        });
});

var app = builder.Build();

app.UseAuthentication();
app.UseAuthorization();
app.UseCors("AllowAnyOriginPolicy"); 
app.UseHttpsRedirection();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); 
}

app.Run();

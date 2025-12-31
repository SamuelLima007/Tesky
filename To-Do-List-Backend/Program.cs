using DotNetEnv;
using IdGen;
using Microsoft.EntityFrameworkCore;
using To_Do_List_Backend.Data;
using To_Do_List_Backend.services;

Env.Load();

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.AddAuthentication("bearer").AddJwtBearer();

builder.Services.AddTransient<TokenService>();

builder.Services.AddOpenApi(); 
builder.Services.AddDbContext<TaskDataContext>(options =>
    options.UseSqlite("Data Source=Tasks.db"));
builder.Services.AddControllers();




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


app.UseCors("AllowAnyOriginPolicy"); 
app.UseHttpsRedirection();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); 
}

app.Run();

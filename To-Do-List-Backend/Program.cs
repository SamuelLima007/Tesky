using IdGen;
using Microsoft.EntityFrameworkCore;
using To_Do_List_Backend.Data;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddOpenApi(); 
builder.Services.AddDbContext<TaskDataContext>(options =>
    options.UseSqlite("Data Source=Tasks.db"));
builder.Services.AddControllers();
var generator = new IdGenerator(0);
builder.Services.AddSingleton(generator);


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

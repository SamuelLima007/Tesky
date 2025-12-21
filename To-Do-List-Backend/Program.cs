using IdGen;
using Microsoft.EntityFrameworkCore;
using To_Do_List_Backend.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddOpenApi(); // Swagger
builder.Services.AddDbContext<TaskDataContext>(options =>
    options.UseSqlite("Data Source=Tasks.db"));
builder.Services.AddControllers();
var generator = new IdGenerator(0);
builder.Services.AddSingleton(generator);

// Configurar CORS corretamente
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAnyOriginPolicy",
        policy =>
        {
            policy.AllowAnyOrigin()   // Permite qualquer origem (domínio)
                  .AllowAnyMethod()   // Permite GET, POST, PUT, DELETE etc.
                  .AllowAnyHeader();  // Permite qualquer cabeçalho
        });
});

var app = builder.Build();

// Middleware: ordem correta
app.UseCors("AllowAnyOriginPolicy"); // 🔹 Ativa CORS antes de qualquer requisição
app.UseHttpsRedirection();

app.MapControllers();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi(); // Swagger para testar a API
}

app.Run();

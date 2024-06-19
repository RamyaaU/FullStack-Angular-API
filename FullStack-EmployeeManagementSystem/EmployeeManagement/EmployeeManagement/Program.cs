using EmployeeManagement.Data;
using EmployeeManagement.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

builder.Services.AddDbContext<ApplicationDBContext>(
    options => options.UseInMemoryDatabase("ApplicationDB"));

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCors", builder =>
    {
        builder.WithOrigins("https://localhost:4200")
        .AllowAnyMethod()
        .AllowAnyHeader();
    });
});


app.MapGet("/", () => "Hello World!");

app.Run();

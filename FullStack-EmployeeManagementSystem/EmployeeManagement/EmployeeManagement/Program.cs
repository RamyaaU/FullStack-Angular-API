using EmployeeManagement.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

builder.Services.AddDbContext<ApplicationDBContext>(
    options => options.UseInMemoryDatabase("ApplicationDB"));

app.MapGet("/", () => "Hello World!");

app.Run();

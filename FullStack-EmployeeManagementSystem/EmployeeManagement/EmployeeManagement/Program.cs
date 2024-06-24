using EmployeeManagement.Data;
using EmployeeManagement.Repositories;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Register services before building the app
builder.Services.AddDbContext<ApplicationDBContext>(
    options => options.UseInMemoryDatabase("ApplicationDB"));

builder.Services.AddScoped<IEmployeeRepository, EmployeeRepository>();

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//// Add CORS policy
//builder.Services.AddCors(options =>
//{
//    options.AddPolicy("MyCors", policyBuilder =>
//    {
//        policyBuilder.WithOrigins("https://localhost:4200")
//            .AllowAnyMethod()
//            .AllowAnyHeader();
//    });
//});

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyCors", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
        //builder.AllowAnyOrigin()
        .AllowAnyHeader()
        .AllowAnyMethod();
    });
});



var app = builder.Build();

app.UseCors("MyCors");

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
    });
}



app.MapControllers(); // Map controllers

app.MapGet("/", () => "Hello World!");

app.Run();

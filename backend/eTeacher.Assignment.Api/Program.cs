using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Services;
using eTeacher.Assignment.Api.Services.Interfaces;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// In-memory data store
builder.Services.AddSingleton<InMemoryDataStore>();

builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IEnrollmentService, EnrollmentService>();



var app = builder.Build();

app.MapControllers();

app.Run();

using eTeacher.Assignment.Api.Data;
using eTeacher.Assignment.Api.Services;
using eTeacher.Assignment.Api.Services.Interfaces;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// In-memory data store
builder.Services.AddSingleton<InMemoryDataStore>();

builder.Services.AddScoped<ICourseService, CourseService>();
builder.Services.AddScoped<IEnrollmentService, EnrollmentService>();
builder.Services.AddScoped<IStudentService, StudentService>();
builder.Services.AddScoped<IStudentCourseAggregator, StudentCourseAggregator>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("frontend", policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

var app = builder.Build();

app.UseCors("frontend");

app.MapControllers();

app.Run();

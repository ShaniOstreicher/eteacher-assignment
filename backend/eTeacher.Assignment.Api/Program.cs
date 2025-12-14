using eTeacher.Assignment.Api.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// In-memory data store
builder.Services.AddSingleton<InMemoryDataStore>();

var app = builder.Build();

app.MapControllers();

app.Run();

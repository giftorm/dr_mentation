// builder can be used for DI and configuration
var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
}

var app = builder.Build();
{
    app.UseHttpsRedirection();
    app.MapControllers();
    app.Run();
}

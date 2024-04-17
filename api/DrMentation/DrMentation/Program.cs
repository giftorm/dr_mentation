using DrMentation.Services.Documents;


// builder can be used for DI and configuration
var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.AddScoped<IDocumentsService, DocumentsService>();
}

var app = builder.Build();
{
    // HTTPS Redirect
    // app.UseHttpsRedirection();
    app.UseStaticFiles();
    app.MapControllers();
    app.Run();
}

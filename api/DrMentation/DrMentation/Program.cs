using DrMentation.Services.Documents;


// builder can be used for DI and configuration
var builder = WebApplication.CreateBuilder(args);
{
    builder.Services.AddControllers();
    builder.Services.AddScoped<IDocumentsService, DocumentsService>();

    // Configure CORS
    builder.Services.AddCors(options =>
    {
        options.AddPolicy("AllowLocalhost",
            builder => builder
                .WithOrigins("http://127.0.0.1:5173") // URL of your React app
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()); // Allow credentials
    });
}

var app = builder.Build();
{
    // HTTPS Redirect
    // app.UseHttpsRedirection();
    app.UseExceptionHandler("/error");
    // app.UseStaticFiles();
    // Use CORS
    app.UseCors("AllowLocalhost");
    app.MapControllers();
    app.Run();
}

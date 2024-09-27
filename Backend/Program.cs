using Lab1_Backend.Models;
using Lab1_Backend.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.Extensions.FileProviders;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using System.IO;
using System.Text;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;

var builder = WebApplication.CreateBuilder(args);

// Konfigurimi i DbContext
builder.Services.AddDbContext<LibrariaContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("LibraTechConn")));

// Regjistrimi i shërbimeve të personalizuara
builder.Services.AddHttpContextAccessor();
builder.Services.AddScoped<IAuthenticationService, AuthenticationService>();
builder.Services.AddScoped<IPasswordHasher<Klienti>, PasswordHasher<Klienti>>();


// Shtimi i Identity nëse nuk është bërë ende (do të diskutohet më poshtë)

// Shtimi i kontrolluesve dhe konfigurimi i JSON
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
    options.SerializerSettings.ContractResolver = new DefaultContractResolver();
});
builder.Services.AddIdentity<IdentityUser, IdentityRole>()
    .AddEntityFrameworkStores<LibrariaContext>()
    .AddDefaultTokenProviders();

// Konfigurimi i JWT Autentifikimit
var jwtSettings = builder.Configuration.GetSection("Jwt");
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.GetValue<string>("Issuer"),
        ValidAudience = jwtSettings.GetValue<string>("Audience"),
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.GetValue<string>("Key"))),
        ClockSkew = TimeSpan.Zero // Zgjatja e kohës për token-in (nëse dëshironi të rregulloni)
    };
});

// Konfigurimi i Autorizimit me Politika
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
    options.AddPolicy("UserOnly", policy => policy.RequireRole("User"));
});

// Shtimi i CORS (Kontrolloni politikat nëse është e nevojshme)

// Konfigurimi i Swagger
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "My API", Version = "v1" });
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "Enter 'Bearer' [space] and then your token in the text input below.",
    });
    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});


builder.Services.AddLogging(logging =>
{
    logging.ClearProviders();
    logging.AddConsole();
    logging.AddDebug();

});



var app = builder.Build();

// Konfigurimi i Middleware Pipeline
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "LibraTechAPI V1");
    });
}
else
{
    app.UseExceptionHandler("/Error");
    app.UseHsts();
}

// Sigurimi i HTTPS (nëse nuk jeni në zhvillim)
if (!app.Environment.IsDevelopment())
{
    app.UseHttpsRedirection();
}

app.UseStaticFiles();

// Konfigurimi i CORS (përzgjedhni politikat sipas nevojës)
app.UseCors(builder =>
{
    builder
    .AllowAnyHeader()
    .AllowAnyOrigin()
    .AllowAnyMethod();

});
app.UseCors("AllowAll");

app.UseRouting();

// Sigurimi i Middleware të Autentifikimit dhe Autorizimit
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private static List<User> users = new();

    [HttpPost("register")]
    public IActionResult Register(User user)
    {
        users.Add(user);
        return Ok(user);
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto login)
    {
        var user = users.FirstOrDefault(x =>
            x.Email == login.Email && x.Password == login.Password);

        if (user == null) return Unauthorized();

        var token = GenerateJwt(user);
        return Ok(new { token });
    }

    private string GenerateJwt(User user)
{
    var claims = new[]
    {
        new Claim(ClaimTypes.Name, user.Email),
        new Claim(ClaimTypes.Role, user.Role)
    };

    var key = new SymmetricSecurityKey(
        Encoding.UTF8.GetBytes("THIS_IS_SUPER_SECRET_KEY_123456789")
    ); // ✅ semicolon added here

    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

    var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.Now.AddHours(2),
        signingCredentials: creds
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}
}
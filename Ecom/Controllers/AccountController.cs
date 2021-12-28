using Ecom.DataAccess.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;


namespace Ecom.Controllers
{
    [ApiController]
    [Route("api/account")]

    public class AccountController : ControllerBase
    {
        private readonly UserManager<IdentityUser> userManger;
        private readonly SignInManager<IdentityUser> signInManager;
        private IConfiguration Configuration;
        private readonly ILogger<AccountController> _logger;

        public AccountController
        (
            UserManager<IdentityUser> userManger,
            SignInManager<IdentityUser> signInManager,
            IConfiguration Configuration,
            ILogger<AccountController> _logger
        )
        {
            this.userManger = userManger;
            this.signInManager = signInManager;
            this.Configuration = Configuration;
            this._logger = _logger;
            // this._goolgeSettings = Configuration.GetSection("GoogleAuthSettings");
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            IActionResult response = Unauthorized();

           
                _logger.LogInformation("Accounts Controller -> Register()-> register params {model}", JsonConvert.SerializeObject(new { Pramas = model }));
                var user = new IdentityUser { UserName = model.UserName, Email = model.Email };
                var result = await userManger.CreateAsync(user, model.Password);
                _logger.LogInformation("Accounts Controller -> Register()-> after user created {model}", JsonConvert.SerializeObject(new { Result = result }));
                if (result.Succeeded)
                {
                    // response = Ok(new { token = tokenString, Name = user.LastName + "," + user.FirstName });
                    response = Ok(new { Name = user.UserName });
                }
            
            return response;

        }

     
        [HttpPost]
        [Route("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login([FromBody] RegisterModel model)
        {
            _logger.LogInformation("Accounts Controller -> Login()-> login params {model}", JsonConvert.SerializeObject(new { Pramas = model }));
            //_logger.LogInformation($"Creating event with name:{model}");
            IActionResult response = Unauthorized();
            //try
            //{

            var user = await userManger.FindByEmailAsync(model.UserName);
            _logger.LogInformation("Accounts Controller -> Login()-> user exists by {UserName}", JsonConvert.SerializeObject(new { Pramas = user }));
            //var result = await userManger.CreateAsync(user, model.Password);
            var result = await signInManager.PasswordSignInAsync(user, model.Password, false/* model.RememberMe*/, false);
            _logger.LogInformation("Accounts Controller -> Login()-> after sign in {result}", JsonConvert.SerializeObject(new { result = user }));
            if (result.Succeeded)
            {
                _logger.LogInformation("Accounts Controller -> Login()-> Generate token by user {user} ", JsonConvert.SerializeObject(new { result = user }));
                var token = GenerateJSONWebToken(user, "Admin");
                // response = Ok(new { token = tokenString, Name = user.LastName + "," + user.FirstName });
                response = Ok(new { Name = user.UserName, BearerToken = token });
            }

            return response;

            //}
            //catch (Exception ex)
            //{
            //    _logger.LogInformation("Accounts Controller -> Login()-> Error {error}", JsonConvert.SerializeObject(new { Pramas = ex }));
            //    throw ex;
            //}

            // return response;

        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> LogOut()
        {
            await signInManager.SignOutAsync();
            IActionResult response = Unauthorized();
            return response;

        }

        private string GenerateJSONWebToken(IdentityUser userInfo, string role)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            _logger.LogInformation("Accounts Controller -> Login()-> Generate token by user {user} ", JsonConvert.SerializeObject(new { result = userInfo, Role = role }));
            List<Claim> claims = new List<Claim>();
            claims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));
            claims.Add(new Claim("UserId", userInfo.UserName));
            //claims.Add(new Claim("UserName", userInfo.LastName + "," + userInfo.FirstName));
            claims.Add(new Claim("role", role));
            claims.Add(new Claim("Id", userInfo.Id));

            var token = new JwtSecurityToken(Configuration["Jwt:Issuer"],
                Configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);
            _logger.LogInformation("Accounts Controller -> GenerateJSONWebToken()-> Generate token by user {user} ", JsonConvert.SerializeObject(new { Token = token }));
            return new JwtSecurityTokenHandler().WriteToken(token);
        }

    }
}
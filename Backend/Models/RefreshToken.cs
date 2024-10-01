namespace Lab1_Backend.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Token { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime ExpiresAt { get; set; }
        public bool IsUsed { get; set; } = false;
        public bool IsRevoked { get; set; } = false;

        // Navigational Property
        public Klienti User { get; set; }
    }
    public class TokenRequestModel
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
    }
    public class TokenResponseModel
    {
        public string Token { get; set; }
        public string RefreshToken { get; set; }
        public int ExpiryMinutes { get; set; }
        public int RefreshTokenExpiryDays { get; set; }
    }

}

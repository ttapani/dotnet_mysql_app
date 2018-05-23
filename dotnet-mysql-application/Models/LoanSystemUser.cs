using Microsoft.AspNetCore.Identity;

public class LoanSystemUser : IdentityUser {
    // Add profile properties associated with the user here:
    public string FirstName { get; set; }
    public string LastName { get; set; }
}
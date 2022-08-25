namespace PhoneBookAPI.Core.Model
{
    public class GetContactsInput
    {
        public int PageNumber { get; set; }

        public int ItemsPerPage { get; set; }

        public string? SearchCriteria { get; set; }
    }
}

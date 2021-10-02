using System.Text.RegularExpressions;

namespace YoutubeMetadataBackup_backend.Utilities
{
    public static class ValidationUtils
    {
        private static readonly Regex YoutubeIDRegex = new(@"[A-Za-z0-9_-]{11}");

        public static bool ValidateYoutubeVideoId(string id)
        {
            if (id.Length != 11)
                return false;

            return YoutubeIDRegex.Match(id).Success;
        }
    }
}
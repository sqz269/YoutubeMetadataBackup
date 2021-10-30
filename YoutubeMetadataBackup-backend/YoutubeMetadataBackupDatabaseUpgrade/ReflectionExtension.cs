using System.Reflection;

namespace YoutubeMetadataBackupDatabaseUpgrade
{
    public static class ReflectionExtension
    {
        public static T GetFieldValue<T>(this object obj, string name)
        {
            var bindingFlags = BindingFlags.Public | BindingFlags.NonPublic | BindingFlags.Instance;
            var field = obj.GetType().GetField(name, bindingFlags);
            return (T) field?.GetValue(obj);
        }
    }
}
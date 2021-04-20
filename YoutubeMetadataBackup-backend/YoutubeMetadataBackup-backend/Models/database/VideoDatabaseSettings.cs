namespace YoutubeMetadataBackup_backend.Models.database
{
    public class VideoDatabaseSettings : IVideoDatabaseSettings
    {
        public string VideoCollectionsName { get; set; }    
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }

    public class IVideoDatabaseSettings
    {
        public string VideoCollectionsName { get; set; }
        public string ConnectionString { get; set; }
        public string DatabaseName { get; set; }
    }
}
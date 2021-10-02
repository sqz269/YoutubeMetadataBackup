# Youtube Metadata Backup (Backend)
Uses ASP.NET Core, MongoDB

## Installation
1. Clone this Repository
        
        git clone https://github.com/sqz269/YoutubeMetadataBackup

2. Install .NET Core 5.0 by following [this manual](https://github.com/dotnet/core/blob/main/release-notes/5.0/5.0.0/5.0.0-install-instructions.md)

4. Setup a MongoDB Instance either by [installing mongodb locally](https://docs.mongodb.com/manual/installation/), or use free hosting from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

3. Edit either `appsettings.json` or user-secrets' `secret.json` and add the following config

        "VideoDatabaseSettings": {
            "VideoCollectionsName": <Collection Name that stores the data>,
            "ConnectionString": <MongoDb Connection String>,
            "DatabaseName": <Database name the collection belongs in>,
            "QueryTimeoutMilliseconds":  <Timeout for database query (In Milliseconds)>,
            "MaxQueryResult": <Max document returned in one search query>
        },
        "ServerYoutubeDataAPIKeys": [
            <Your Youtube Data API Key, For Retrieving Youtube Video Data>,
        ],
        "ClientAPIKeys": {
            "YoutubeDataAPI": [
                <Not Used>
            ]
        }

4. Follow [this documentation](https://docs.microsoft.com/en-us/aspnet/core/host-and-deploy/linux-nginx?view=aspnetcore-5.0) to deploy the backend server

'use strict'

exports.dbConfig = {
    atlas_username:"shahzaib",
    atlas_password:"zx112233",
    
    mLab_username: "shahzaib",
    mLab_password: "zx112233",

    database:'patient_tracker',
    connection_atlas: 'mongodb://shahzaib:zx112233@patient-tracker-shard-00-00-seewv.mongodb.net:27017,patient-tracker-shard-00-01-seewv.mongodb.net:27017,patient-tracker-shard-00-02-seewv.mongodb.net:27017/'+this.database+'?ssl=true&replicaSet=patient-tracker-shard-0&authSource=admin',
    connection_mlab: 'mongodb://shahzaib:zx112233@ds117913.mlab.com:17913/patient_tracker',
    localhost_connection: 'mongodb://localhost/patient_tracker'
};

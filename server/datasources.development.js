var MONGO_HOST = process.env.MONGODB_SERVICE_HOST || 'mongo-cochera';
var MONGODB_DATABASE = process.env.MONGODB_DATABASE || 'cochera';
var MONGODB_USER = process.env.MONGODB_USER || 'cochera';
var MONGODB_PASSWORD = process.env.MONGODB_PASSWORD || 'cochera';

module.exports = {
    db: {
        name: "db",
        connector: "memory"
    },
    mongo: {
        name: "mongo",
        connector: "mongodb",
        host: MONGO_HOST,
        database: MONGODB_DATABASE,
        user: MONGODB_USER,
        password: MONGODB_PASSWORD
    }
};

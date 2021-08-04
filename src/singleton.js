const mongoose = require("mongoose")
class PrivateSingleton {
    constructor() {
        //this.message = 'I am an instance';
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true
        })
        var db = mongoose.connection;
        db.on("error", console.error.bind(console, "error al conectar bd"));
        db.once("open", function () {
            console.log("bd conectada")
        })
    }
}
class Singleton {
    constructor() {
        throw new Error('Use Singleton.getInstance()');
    }
    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new PrivateSingleton();
        }
        return Singleton.instance;
    }
}
module.exports = Singleton;
const { Transform } = require('stream');

// Appends the initialization vector
class AppendInitVect extends Transform {
    constructor(initVect, opts) {
        super(opts);
        this.initVect = initVect;
        this.appended = false;
    }

    _transform(chunk, encoding, cb) {
        if (!this.appended) {
            this.push(this.initVect)
            this.appended = true;
        }
        this.push(chunk);
        cb();
    }
}

// Exports 
 
module.exports = AppendInitVect;
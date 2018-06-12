const mongoose            =   require('mongoose'),
      path                =   require('path'),
      config              =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
      crypto              =   require('crypto'),
      _                   =   require('lodash'),
      ObjectId            =   mongoose.Types.ObjectId,
      uniqueValidator     =   require('mongoose-unique-validator'),
      schema              =   mongoose.Schema;

var userSchema = new schema({
    auth: String,
    name: String,
    email: {
        type : String,
        lowercase: true,
        trim : true,
        required: "Email address is required.", 
        unique: "This email address is already exists."
    },
    password: String,
    mobile: {
        type : String,
        trim : true,
        unique: "This mobile number is already exists."
    },
    usertype : String,
    bio : String,
    status : {
        type : Boolean,
        default : true
    },
    isEmailActive : {
        type : Boolean,
        default : false
    },
    otp: String,
    permissions: Array
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'         
    }
});

/**
 * Pre-Save Hook
 * Used to generate Private Key & Passwords
 * when new user created
 */
userSchema.pre('save', function(next) {
    this.auth     = crypto.randomBytes(16).toString('hex');
    this.password = this.encryptPassword(this.password, this.auth);
    next();
});

/**
 * encryptPassword - encrypt password 
 * by using crypto and mongoose methods
 * @param  {String} password [user password]
 * @param  {String} secret   [private key to encrypt data]
 * @return {[type]}          [encrypted password using user's Private key]
 */
userSchema.methods.encryptPassword = function(password, secret) {
    return crypto.createHmac('sha512', secret).update(password).digest('base64');
};


/* match password by using crypto and mongoose methods*/
userSchema.methods.matchPassword = function(password) {
    return this.password === this.encryptPassword(password);
};

/* encrypt password by using crypto and mongoose methods*/
userSchema.statics.getPassword = function(password, secret) {
    return crypto.createHmac('sha512', secret).update(password).digest('base64');
};

/*update user data*/
userSchema.statics.updateUser = function(_id, data){
    return new Promise((resolve, reject) => {
        this.findOneAndUpdate({
            _id : new ObjectId(_id),
        },data, {new :false}, (err, updated) => {
            if(err) reject(err);
            if(updated) {
                resolve(true);
            }
        });
    });
}

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('user', userSchema);
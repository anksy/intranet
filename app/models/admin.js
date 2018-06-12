const mongoose          =   require('mongoose'),
    path                =   require('path'),
    config              =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    crypto              =   require('crypto'),
    uniqueValidator     =   require('mongoose-unique-validator'),
    schema              =   mongoose.Schema;


var adminSchema = new schema({
    firstname: String,
    lastname: String,
    username: {
        type : String,
        lowercase: true,
        trim : true,
        required: "Username is required.", 
        unique: "This username is already exists."
    },
    email: {
        type : String,
        lowercase: true,
        trim : true,
        required: "Email address is required.", 
        unique: "This email address is already exists."
    },
    bio: String,
    image: String,    
    password: String,
    mobile: String,
    resetKey: String,
    type: Number,       //1=Admin,2=SubAdmin
    auth: String,
    status : {
        type : Boolean,
        default : false
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'         
    }
});


adminSchema.pre('save', function (next) {
    this.auth = crypto.randomBytes(16).toString('hex');
    this.password = this.encryptPassword(this.password);
    next();
});

/* encrypt password by using crypto and mongoose methods*/
adminSchema.methods.encryptPassword = function(password) {
    // console.log(crypto.createHmac('sha512', config.secret).update(password).digest('base64'));
    return crypto.createHmac('sha512', config.secret).update(password).digest('base64');
};


/* match password by using crypto and mongoose methods*/
adminSchema.methods.matchPassword = function(password) {
    // console.log(this.encryptPassword(password));
    return this.password === this.encryptPassword(password);
};

/* encrypt password by using crypto and mongoose methods*/
adminSchema.statics.hashPassword = function(password) {
    // console.log(crypto.createHmac('sha512', config.secret).update(password).digest('base64'));
    return crypto.createHmac('sha512', config.secret).update(password).digest('base64');
};

adminSchema.plugin(uniqueValidator);
module.exports = mongoose.model('admin', adminSchema);
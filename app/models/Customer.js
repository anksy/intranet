const mongoose            =   require('mongoose'),
      path                =   require('path'),
      config              =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
      schema              =   mongoose.Schema;

var customerSchema = new schema({
    firstname: String,
    lastname: String,
    company: String,
    email: {
        type : String,
        lowercase: true,
        trim : true,
        unique: "This email address is already exists."
    },
    mobile: {
        type : String,
        trim : true,
        unique: "This mobile number is already exists."
    },
    status : {
        type : Boolean,
        default : true
    }
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'         
    }
});


/*update user data*/
customerSchema.statics.updateUser = function(_id, data){
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

module.exports = mongoose.model('customer', customerSchema);
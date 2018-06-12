const mongoose          =   require('mongoose'),
    path                =   require('path'),
    config              =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    crypto              =   require('crypto'),
    uniqueValidator     =   require('mongoose-unique-validator'),
    schema              =   mongoose.Schema;


var settingSchema = new schema({
    meta_key: String,    
    meta_value: String
},{
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'         
    }
});

settingSchema.plugin(uniqueValidator);
module.exports = mongoose.model('setting', settingSchema);
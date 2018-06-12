'use strict';

const
    _startAt = 100000,
    mongoose          =   require('mongoose'),
    path                =   require('path'),
    shortid             = require('shortid'),
    slug                = require('mongoose-slug-generator'),
    config              =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    schema              =   mongoose.Schema;


    mongoose.plugin(slug);

    var leadSchema = new schema({
        quoteno: Number,
        account: String,
        project: String,
        source: String,
        event: String,
        initial_contact: String,
        business_card: String,
        firstname: String,
        lastname: String,
        phone_number: String,
        email: String,
        //area: String,
        address: Object,
        title: String,
        company: String,
        website: String,
        notes: Array,
        quote_date: Date,
        contract_date: Date,
        products: Array,
        author : mongoose.Schema.Types.ObjectId,
        status : {
            type: Boolean,
            default : false
        },
        trash : {
            type : Boolean,
            default : false
        }
    },{
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'         
        }
    });


leadSchema.pre('save', function (next) {
    let self = this, counter;

    /**
     * [for creating unique IDs]
     */
    self.constructor.findOne({ "quoteno": { $exists: true } }, { "quoteno": true }).sort({"quoteno":-1}).exec((err, result) => {
        if(err){
           return next(err);
        }
        if(result){
            counter = result.quoteno;
        }else{
            counter = _startAt;
        } 
        /**assignig an ID & Identifier to each Job */
        self.quoteno = parseInt(counter)+1;
        return next();
    })
});

    module.exports = mongoose.model('lead', leadSchema);
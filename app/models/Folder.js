'use strict';

const mongoose          =   require('mongoose'),
    path                =   require('path'),
    shortid             = require('shortid'),
    slug                = require('mongoose-slug-generator'),
    config              =   require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    schema              =   mongoose.Schema;


    mongoose.plugin(slug);

    var folderSchema = new schema({
        title: String,
        slug: {
            type: String,
            slug: "title",
            unique: "This slug is already in used.",
            lowercase: true,
            slug_padding_size: 1
        },
        resourceType :  {
            type : String,
            enum : ['file', 'folder'],
            default : "folder"
        },
        type :  {
            type : String,
            enum : ['public', 'private'],
            default : "private"
        },
        access : {type:Array},
        attachment : {type:Object},
        mimeType : {type:String, default:"application/dir"},
        created_by : mongoose.Schema.Types.ObjectId,
        parent : mongoose.Schema.Types.ObjectId,
        status : {
            type : Boolean,
            default : false
        },
        trash : {
            type : Boolean,
            default : false
        },
        path: String,
        breadcrumb: Array,
        resouces : {
            files : {type:Number, default:0},
            folders : {type:Number, default:0},
            size : {type:Number, default:0}
        }
    },{
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'         
        }
    });


    folderSchema.pre('save', function (next) {
        if (!this.path){
            this.path = this.slug;
        }

        if (this.resourceType === 'file' && !this.slug){
            this.slug = shortid.generate();
        }
        next();
    });

    folderSchema.statics.updatePath = function(path, newDir){

        this.findOneAndUpdate({
            _id: newDir._id
        }, {
                path: newDir.parent ? path + "/" + newDir.slug : newDir.slug
        }, (err, updated) => {
            // file updated
        });
    }



    module.exports = mongoose.model('folder', folderSchema);
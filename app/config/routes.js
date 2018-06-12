'use strict';

const path            = require('path'),
    fs              = require('fs'),
    expressJWT      = require('express-jwt'),
    env             = require(path.resolve(`./app/config/env/${process.env.NODE_ENV}`)),
    DECODE          = require(path.resolve('./app/config/libs/verify_jwt')),
    api_path        = env.API.site,
    admin_api_path  = env.API.admin;

class AppRouter {
    constructor(app, router){
        this.call = {
            frontend : {}
        };
        this.frontend = {};
        this.backend = {};

        /**/
        this.api_path = api_path;
        this.admin_api_path = admin_api_path;

        /**/
        this.app = app;
        this.router = router;
    }

    loadAppClasses(){
        fs.readdirSync(path.resolve('./app/controllers/frontend')).forEach(file => {
            let name = file.substr(0, file.indexOf('.'));
            /*Store Classes in frontend object*/
            this.frontend[name] = require(path.resolve(`./app/controllers/frontend/${name}`));
            /*Init All Classes & add Object to Array*/
            this.call['frontend'][name] = new this.frontend[name]();
        });
    }

    unlessRoutes(){
        this.router.use(expressJWT({
            secret: env.secret,
        }).unless({
            path: [
                this.api_path+'send-otp',
                this.api_path+'login',
                this.api_path+'register',
                this.api_path+'reset-password',
                //this.api_path+'updateWithImage'
            ]
        }));
    }

    loadAppRoutes(){
        this.router.get('/send-otp', this.call['frontend']['UserController'].sendOTP);
        this.router.post('/login', this.call['frontend']['UserController'].login);
        this.router.post('/register', this.call['frontend']['UserController'].register);
        this.router.post('/reset-password', this.call['frontend']['UserController'].reset);
        this.router.post('/change-password', this.call['frontend']['UserController'].changePassword);
        this.router.post('/update-profile-image', this.call['frontend']['UserController'].updateProfileImage);
        this.router.put('/update-profile', this.call['frontend']['UserController'].updateProfile);
        this.router.get('/get-profile', this.call['frontend']['UserController'].getProfile);

        /*Manage Users*/
        this.router.post('/add-employee', this.call['frontend']['EmployeeController'].addEmployee);
        this.router.put('/update-employee', this.call['frontend']['EmployeeController'].updateEmployee);
        this.router.get('/list-employee', this.call['frontend']['EmployeeController'].listEmployee);
        this.router.get('/get-employee', this.call['frontend']['EmployeeController'].oneEmployee);
        this.router.put('/update-all-employees', this.call['frontend']['EmployeeController'].updateAll);


        /*Manage Customers*/
        this.router.post('/add-customer', this.call['frontend']['CustomerController'].addCustomer);
        this.router.put('/update-customer', this.call['frontend']['CustomerController'].updateCustomer);
        this.router.get('/list-customer', this.call['frontend']['CustomerController'].listCustomer);
        this.router.get('/get-customer', this.call['frontend']['CustomerController'].oneCustomer);
        this.router.put('/update-all-customers', this.call['frontend']['CustomerController'].updateAll);
        
        /*Manage Leads*/
        this.router.get('/leads', this.call['frontend']['LeadsController'].list);
        this.router.post('/leads/add', DECODE.verified, this.call['frontend']['LeadsController'].add);
        this.router.put('/leads/edit', DECODE.verified, this.call['frontend']['LeadsController'].edit);
        this.router.get('/leads/single', DECODE.verified, this.call['frontend']['LeadsController'].single);

        this.router.post('/generate/quote', DECODE.verified, this.call['frontend']['GeneratorController'].quote);

        /* this.router.put('/list/update-customer', this.call['frontend']['CustomerController'].updateCustomer);
        this.router.get('/list-customer', this.call['frontend']['CustomerController'].listCustomer);
        this.router.get('/get-customer', this.call['frontend']['CustomerController'].oneCustomer);
        this.router.put('/update-all-customers', this.call['frontend']['CustomerController'].updateAll); */


        /*Manage Folders*/
        this.router.get('/get-dirs', this.call['frontend']['FolderController'].listFolders);
        this.router.post('/add-dir', this.call['frontend']['FolderController'].addFolder);
        this.router.put('/remove-dir', this.call['frontend']['FolderController'].removeFolder);
        this.router.put('/update-dir', this.call['frontend']['FolderController'].updateFolder);
        this.router.put('/update-all-dir', this.call['frontend']['FolderController'].updateAll);
        this.router.put('/share-resources', this.call['frontend']['FolderController'].shareFolder);
        /*Uplaod media*/
        this.router.post('/upload-file', this.call['frontend']['FolderController'].uploadFile);
        this.router.get('/get-users-of-dir', DECODE.verified, this.call['frontend']['FolderController'].getUsersofDir);
        this.router.put('/remove-access', DECODE.verified, this.call['frontend']['FolderController'].removeAccess);

        /*Setting controller*/
        this.router.post('/update-settings', this.call['frontend']['SettingsController'].updateWithImage);
        this.router.get('/get-settings', this.call['frontend']['SettingsController'].getSettings);
    }

    init(){
        this.loadAppClasses();
        this.unlessRoutes();
        this.loadAppRoutes();

        return this.router;
    }
}

module.exports = AppRouter;
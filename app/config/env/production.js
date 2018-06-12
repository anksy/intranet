'use strict';
const DS       = "/",
      PORT     = 5000,
      __DB     = "intranet",
      base_url = "http://18.219.200.29:"+PORT+DS;

module.exports = {
  admin : {
    path : "/manager"
  },
  admin_base_url: base_url+"manager/",
  API : {
    site  : '/api/',
    admin : '/admin_api/' 
  },
  base_url: base_url,
  constants : {
    from: "website",
  },
  db: {
    name : __DB,
    URL: "mongodb://localhost/"+__DB,
    options: {
      user: '',
      pass: ''
    }
  },
  debug_mongo: true,
  DS: "/",
  image_destination: 'uploads',
  image_dstn_w_slash : "./uploads/",
  image_extensions : {
    'image/jpeg' : '.jpg',
    'image/jpg' : '.jpg',
    'image/png' : '.png',
    'image/gif' : '.gif'
  },
  listing : {
    limit : 10
  },
  secret : new Buffer("@#$Ggf34#$Yfwv12&*_34sdVV5443g$#G$#TVS@#f3g2&^%JH#2fc2@@@@@^%f2f23f#@@#fg").toString('base64'),
  /*for sending emails*/
  server: {
    PORT: PORT
  },
  sendgrid: {
    key: "xxx",
    username: "xxx",
    password: "xxx",
    emlUsed: "xxx"
  },
  cdn: {
    cloud_name: 'xearn',
    api_key: '452686395835747',
    api_secret: '4vOMHHf1ofVtCmbOO59ZdbRIidc'
  }
};
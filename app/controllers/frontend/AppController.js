const path = require("path"),
	  _    = require("lodash");

class App {

	constructor(){
		//console.log("from App cont. constructor");
		this.welcome = "Welcome to NodeJS ES6";
	}

	__if_valid_email(){
		let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
		return re.test(email);
	}


	__random(size=6, isNumeric=false){
	  	let string = !isNumeric?"QWERTYUIOPLKJHGFDSAZXCVBNM12346790":"12346790";
		let rand = string.split('');
		let shuffle = _.shuffle(rand);
		let num = _.slice(shuffle,0,size);
		return num.join("");
	}
}

module.exports = App;
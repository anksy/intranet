const _      = require('lodash'), 
	  path   = require('path');

module.exports = {
	ifEmail : (e) => {
		const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  		return re.test(e);
	},

	random : (size=6, isNumeric=false) => {
		let string = !isNumeric?"QWERTYUIOPLKJHGFDSAZXCVBNM12346790":"12346790";
		let rand = string.split('');
		let shuffle = _.shuffle(rand);
		let num = _.slice(shuffle,0,size);
		return num.join("");
	}
}
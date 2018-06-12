
'use strict';

let _env= {};
	_env.prefix ="intranet";

	if(window.location.hostname==='localhost'){
		_env.api_url = 'http://localhost:5000/api/';
		_env.base_url = 'http://localhost:5000/';
	}else{
		_env.api_url = 'http://18.219.200.29:5000/api/';
		_env.base_url = 'http://18.219.200.29:5000/';
	}


window._env =_env;


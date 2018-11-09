/**
 * Modules
 * */
const debug = require('debug');
const axios = require('axios');
const crypto = require('crypto');

/**
 * Constants
 * */
const ENDPOINT_TIMEOUT = 30000;
const DEBUG_PREFIX = 'skinpay-api';
const ENDPOINT_URL = 'https://skinpay.com/';

class SkinPayApi {
	constructor({ privateKey, publicKey }) {
		this.publicKey = publicKey || '';
		this.privateKey = privateKey || '';

		this.debug = debug(DEBUG_PREFIX);
		this.error = debug(DEBUG_PREFIX + ':' + 'error');

		this.axios = axios.create({"responseType": 'json', "baseURL": ENDPOINT_URL, "timeout": ENDPOINT_TIMEOUT});
		this.axios.interceptors.response.use((config) => config, this.handleRequestError.bind(this));
	}


	handleRequestError(error) {
		this.error(error['message']);
		return Promise.reject(error);
	}


	request({baseURL, headers, httpMethod = 'post', iface='', method, data={}}={}) {
		if (typeof iface !== 'string') {
			throw new Error('iface is required');
		}

		if (typeof method !== 'string') {
			throw new Error('method is required');
		}

		let url = [iface, method].join('/');

		data['sign'] = this.makeSign(data);
		baseURL = baseURL || this.axios.defaults["baseURL"];
		headers = Object.assign(Object.assign({}, this.axios.defaults["headers"]), headers);

		this.debug('send request %o', {baseURL, httpMethod, iface, method, data, headers});

		return this.axios({
			"url": url,
			"baseURL": baseURL,
			"headers": headers,
			"method": httpMethod,
			[httpMethod.toLowerCase() === 'get' ? 'params' : 'data']: data,
		});
	}


	makeSign(params) {
		let { privateKey } = this, str = '';

		Object.keys(params).sort().forEach(function(key) {
			if (key === 'sign') return;
			str += '' + key + ':' + params[key] + ';';
		});

		return crypto.createHmac('sha1', privateKey).update(str).digest('hex')
	}


	get deposit() {
		return {
			'create': this.depositCreate.bind(this),
			'result': this.depositResult.bind(this),
		};
	}


	get api() {
		return {
			'getOrderStatus': this.getOrderStatus.bind(this),
		};
	}
}

module.exports = SkinPayApi;
require('./interfaces/deposit');
require('./interfaces/api');
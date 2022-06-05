var FetchPrefix = (function (exports) {
	'use strict';

	/** @typedef {import('./index').HTTPMethods} HTTPMethods */

	if (!globalThis.fetch || typeof globalThis.fetch !== 'function') {
		throw new Error("Couldn't find fetch!");
	}

	/**
	 * Validate URL function.
	 * @param {string} url URL want to validate.
	 * @return {boolean}
	 */
	function validateUrl(url) {
		try {
			return !!new URL(url);
		} catch {
			return false;
		}
	}

	/**
	 * Resolve URL w/ (baseURL)
	 * @param {string | URL} url Children url
	 * @param {string | URL} baseUrl Parent url
	 * @param {boolean} forceHost Force change the baseUrl
	 * @return {URL}
	 */
	function resolveUrl(url, baseUrl, forceHost) {
		if (url instanceof URL) {
			if (
				baseUrl instanceof URL &&
				url.hostname !== baseUrl.hostname &&
				forceHost
			) {
				return new URL(url.pathname, baseUrl);
			}
		}
		if (
			baseUrl &&
			((typeof baseUrl === 'string' && baseUrl.length) ||
				baseUrl instanceof URL) &&
			validateUrl(baseUrl)
		) {
			return new URL(url, baseUrl instanceof URL ? baseUrl.origin : baseUrl);
		} else {
			if (!validateUrl(url)) throw new TypeError('Invalid URL');
			else return new URL(url);
		}
	}

	/**
	 * @class FetchPrefixUrl
	 */
	class FetchPrefixUrl {
		/**
		 * @param {string} baseUrl Request Base URL.
		 */
		constructor(baseUrl) {
			/** @private */
			this.baseUrl = resolveUrl(baseUrl);
		}

		/**
		 * Request
		 * @param {string | URL} url Children URL.
		 * @param {HTTPMethods} method HTTP Request Methods.
		 * @param {RequestInit} input Request input data.
		 * @return {Promise<Response>}
		 */
		request(url, method = 'GET', input) {
			if (!/^(get|p(os|u)t|delete|options|head)$/gi.test(method))
				throw new TypeError('Invalid HTTP Method');
			method = method.toUpperCase();
			return fetch({
				url: resolveUrl(url, this.baseUrl, false).href,
				method,
				...input,
			});
		}

		/**
		 * Do GET Request
		 * @param {string | URL} url Requested URL.
		 * @param {RequestInit} options Request options.
		 * @return {Promise<Response>}
		 */
		get(url, options) {
			return this.request(url, 'GET', options);
		}

		/**
		 * Do HEAD Request
		 * @param {string | URL} url Requested URL.
		 * @param {RequestInit} options Request options.
		 * @return {Promise<Response>}
		 */
		head(url, options) {
			return this.get(url, {
				...options,
				method: 'HEAD',
			});
		}

		/**
		 * Do POST Request
		 * @param {string | URL} url Requested URL.
		 * @param {string | Object | Array} body Requested body.
		 * @param {RequestInit} options Request options.
		 * @return {Promise<Response>}
		 */
		post(url, body, options) {
			if (Array.isArray(body) || typeof body === 'object')
				body = JSON.stringify(body);
			else if (body instanceof URLSearchParams) body = body.toString();
			return this.request(url, 'POST', {
				...options,
				body,
			});
		}

		/**
		 * Do DELETE Request
		 * @param {string | URL} url Requested URL.
		 * @param {RequestInit} options Request options.
		 * @return {Promise<Response>}
		 */
		delete(url, options) {
			return this.get(url, {
				...options,
				method: 'DELETE',
			});
		}

		/**
		 * Do OPTIONS Request
		 * @param {string | URL} url Requested URL.
		 * @param {RequestInit} options Request options.
		 * @return {Promise<Response>}
		 */
		option(url, options) {
			return this.request(url, 'OPTIONS', {
				...options,
				body,
			});
		}

		/**
		 * Set current base url.
		 * @param {string} url Set the base URL.
		 * @return {void}
		 */
		setBase(url) {
			this.baseUrl = resolveUrl(url);
		}
	}

	exports.FetchPrefixUrl = FetchPrefixUrl;
	exports.resolveUrl = resolveUrl;
	exports.validateUrl = validateUrl;

	Object.defineProperty(exports, '__esModule', { value: true });

	return exports;

})({});

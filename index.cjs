'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
 * @param {string} url Children url
 * @param {string?} baseUrl Parent url
 * @return {URL}
 */
function resolveUrl(url, baseUrl) {
	if (
		baseUrl &&
		typeof baseUrl === 'string' &&
		baseUrl.length &&
		validateUrl(baseUrl)
	) {
		return new URL(url, baseUrl);
	} else {
		if (!validateUrl(url)) throw new TypeError('Invalid URL');
		else return new URL(url);
	}
}

/**
 * @class FetchPrefixUrl
 */
class FetchPrefixUrl {}

exports.FetchPrefixUrl = FetchPrefixUrl;
exports.resolveUrl = resolveUrl;
exports.validateUrl = validateUrl;

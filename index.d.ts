export type HTTPMethods =
	| 'GET'
	| 'POST'
	| 'PUT'
	| 'OPTIONS'
	| 'HEAD'
	| 'DELETE';
export declare function validateUrl(url: string): boolean;
export declare function resolveUrl(
	url: string,
	baseUrl?: string,
): string | undefined;

export declare class FetchPrefixUrl {
	constructor(baseUrl: string);
}

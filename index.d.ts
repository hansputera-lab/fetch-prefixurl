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

	get(url: string, options: RequestInit): Promise<Response>;
	delete(url: string, options: RequestInit): Promise<Response>;
	head(url: string, options: RequestInit): Promise<Response>;
	option(url: string, options: RequestInit): Promise<Response>;
	post(
		url: string,
		body: string | Object | Array,
		options: RequestInit,
	): Promise<Response>;
	put(
		url: string,
		body: string | Object | Array,
		options: RequestInit,
	): Promise<Response>;
	setBase(url: string): void;
}

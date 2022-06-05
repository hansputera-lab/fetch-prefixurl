# Fetch With Base URL
I created `fetch-baseurl` package to use `fetch` with base url. Based on [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

## Installation
> npm i fetch-baseurl

If I want use it in browser, just copy the `index.browser.js` codes to workspace. And, import it.

## Usage
NodeJS
```js
import { FetchPrefixUrl } from 'fetch-baseurl';

const request = new FetchPrefixUrl('https://site.com');
```

Browser:
```html
....
    <script src="./your-path/index.browser.js">
    <script>
       const request = new FetchPrefix.FetchPrefixUrl('http://site.com'); 
    </script>
....
```
---
```js
// method: GET
request.get('./api/users').then((response) => {
    console.log(response.status);
});


// method: POST
requst.post('./api/users', {
    token: 'ee2823jds92....',
    username: 'john',
    password: Buffer.from('safe-password').toString('hex'),
}).then(console.log);

// others: PUT, DELETE, HEAD, and, OPTION.
```

# fetch

Opinionated fetch wrapper for modern front-end.

## Install

```
npm install --save @ckldeveloper/fetch
```

## Initialize

```javascript
  // request.js
  import fetch from '@ckldeveloper/fetch'
  export default fetch.api('http://your_api.io/api/v1/', defaultOptions)
```


## REQUEST
```javascript
  import fetch from './request'

  fetch.get('users')
  fetch.post('users', options, body)
  fetch.patch('users', options, body)
  fetch.put('users', options, body)
  fetch.delete('users')
  fetch.upload('users', options, formData)
```

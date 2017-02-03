# fetchy

Opinionated fetch wrapper for modern front-end.

## Initialize

```javascript
  // request.js
  import fetchy from 'fetchy'
  export default fetchy.api('http://your_api.io/api/v1/') 
```


## GET
```javascript
  import fetchy from './request'
  
  fetchy.get('users') 
```
## POST

```javascript
  import fetchy from './request'
  
  fetchy.post('users', { body }) 
```

## PUT

```javascript
  import fetchy from './request'
  
  fetchy.put('users', { body }) 
```

## DELETE

## PATCH

## Utils

### snakeCase

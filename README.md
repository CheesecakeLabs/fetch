# fetch

Opinionated fetch wrapper for modern front-end.

## Install

```
yarn add @cheesecakelabs/fetch
```

## Initialize

```javascript
import CKLFetch from '@cheesecakelabs/fetch'

const fetch = new CKLFetch('http://your_api.io/api/v1/')

fetch.get('users')
fetch.post('users', options, body)
fetch.patch('users', options, body)
fetch.put('users', options, body)
fetch.delete('users')
fetch.upload('users', options, formData)

fetch.get(['campaigns', 'my-campaign-id'], { key, params })

const data = new FormData()
data.append('file', payload.image)
data.append('upload_preset', UPLOAD_PRESET)
fetch.upload('some-ednpoint', {}, data)
```

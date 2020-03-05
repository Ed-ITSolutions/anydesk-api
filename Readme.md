# AnyDeskAPI

AnyDeskAPI is a TypeScript (JS) implementation of the [AnyDesk API](https://support.anydesk.com/REST-API).

## Install

```
npm install --save anydesk-api

# or

yarn add anydesk-api
```

The TypeScript types are bundled in the package and are installed with `anydesk-api`

## Usage

Import `AnyDeskAPI` from `anydesk-api`

```ts
import {AnyDeskAPI} from 'anydesk-api'

const api = AnyDeskAPI({
  license: 'YOURLICENSEID',
  apiPassword: 'YOURAPIPASSWORD'
})
```

Instead of `api` you can [desctructure](https://www.arcath.net/2019/11/destructuring-in-javascript) all the methods.
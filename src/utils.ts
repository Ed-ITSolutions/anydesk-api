import fetch from 'node-fetch'

import {AuthString} from 'auth'

export const makeGetRequest = <T>(
  resource: string,
  authString: AuthString,
  {hostname, port}: {hostname: string, port: number} = {hostname: 'v1.api.anydesk.com', port: 8081}): Promise<T> => {
    return fetch(`https://${hostname}:${port}${resource}`, {
      headers: {
        Authorization: authString
      }
    }).then((response) => {
      return response.json()
    })
}

export const makePatchRequest = (
  resource: string,
  content: string,
  authString: AuthString,
  {hostname, port}: {hostname: string, port: number} = {hostname: 'v1.api.anydesk.com', port: 8081}): Promise<boolean> => {
    return fetch(`https://${hostname}:${port}${resource}`, {
      headers: {
        Authorization: authString,
        'Content-Type': 'application/json'
      },
      method: 'PATCH',
      body: content
    }).then(() => {
      return true
    })
}

export const makePostRequest = (
  resource: string,
  content: string,
  authString: AuthString,
  {hostname, port}: {hostname: string, port: number} = {hostname: 'v1.api.anydesk.com', port: 8081}): Promise<boolean> => {
    return fetch(`https://${hostname}:${port}${resource}`, {
      headers: {
        Authorization: authString,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: content
    }).then(() => {
      return true
    })
}

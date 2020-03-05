import utf8 from 'utf8'
import crypto from 'crypto'

interface AuthOptions{
  license: string
  apiPassword: string
  httpMethod: string
  resource: string
  content: string
  timestamp?: number
}

export type AuthString = string

export const contentHash = (content: string) => {
  return crypto
    .createHash('sha1')
    .update(content, 'utf8')
    .digest('base64')

}

export const authString = ({license, apiPassword, httpMethod, resource, content, timestamp}: AuthOptions): AuthString => {
  const time = timestamp ? timestamp : Math.floor(new Date().getTime() / 1000)

  const requestString = `${httpMethod}\n${resource}\n${time}\n${contentHash(content)}`

  const token = crypto
    .createHmac('sha1', utf8.encode(apiPassword))
    .update(utf8.encode(requestString))
    .digest('base64')

  return `AD ${license}:${time}:${token}`
}
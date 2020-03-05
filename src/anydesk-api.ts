import {authString} from './auth'
import {makeGetRequest, makePatchRequest, makePostRequest} from './utils'

export interface Clients{
  count: number
  selected: number
  offset: number
  online: boolean
  list: Client[]
}

export interface Client{
  alias: string | null
  cid: number
  'client-version': string
  comment: string | null
  online: boolean
  'online-time': number
  user_ref: string | null
}

export interface ClientExtended extends Client{
  'last-sessions': Session[]
}

export interface Session{
  active: boolean
  comment: string | null
  dst_user_ref: number | null
  duration: number
  'end-time': number
  from: {alias: string|null, cid: number}
  sid: number
  src_user_ref: number | null
  'start-time': number
  to: {alias: string|null, cid: number}
}

export interface Sessions{
  cid: number
  offset: number
  selected: number
  list: Session[]
  limit: number
  direction: string
  count: number
  'duration.max': number
  'duration.min': number
}

export interface SystemInformation{
  'api-ver': string
  name: string
  standalone:boolean
  clients: {
    online: number
    offline: number
  }
  sessions: {
    active: number
    total: number
  }
  license: {
    'api-password': string
    expires: number
    'has-expired': boolean
    'license-id': string
    'license-key': string
    'max-clients': number
    'max-session-time': number
    'max-sessions': number
    name: string
    namespaces: string[]
    'power-user': false
  }
}

export const AnyDeskAPI = ({license, apiPassword}: {license: string, apiPassword: string}) => {
  const authenticate = async () => {
    const auth = authString({license, apiPassword, httpMethod: 'GET', resource: '/auth', content: ''})

    const response = await makeGetRequest<{'license-id':string, result: string}>('/auth', auth)

    return response
  }

  const authenticationString = (httpMethod: string, resource: string, content: string = '') => {
    return authString({license, apiPassword, resource, httpMethod, content})
  }

  const clients = async ({offset, limit, online}: {offset: number, limit: number, online: boolean}) => {
    const resource = `/clients?offset=${offset}&limit=${limit}${online ? '&online' : ''}`

    const auth = authString({license, apiPassword, httpMethod: 'GET', resource, content: ''})

    return makeGetRequest<Clients>(resource, auth)
  }

  const client = async (client: number) => {
    const resource = `/clients/${client}`

    const auth = authString({license, apiPassword, httpMethod: 'GET', resource, content: ''})

    return makeGetRequest<ClientExtended>(resource, auth)
  }

  const closeSession = async (session: number) => {
    const resource = `/sessions/${session}/action`
    const content = JSON.stringify({action: 'close'})

    const auth = authString({license, apiPassword, httpMethod: 'POST', resource, content})

    return makePostRequest(resource, content, auth)
  }

  const sessions = async (client?: number) => {
    const resource = `/sessions${client ? `?cid=${client}` : ''}`

    const auth = authString({license, apiPassword, httpMethod: 'GET', resource, content: ''})

    return makeGetRequest<Sessions>(resource, auth)
  }

  const session = async (session: number) => {
    const resource = `/sessions/${session}`

    const auth = authString({license, apiPassword, httpMethod: 'GET', resource, content: ''})

    return makeGetRequest<Session>(resource, auth)
  }

  const setAlias = async (client: number, alias: string | null, company: string = 'ad') => {
    const resource = `/clients/${client}`
    const content = JSON.stringify({alias: alias ? `${alias}@${company}` : null})

    const auth = authString({license, apiPassword, httpMethod: 'PATCH', resource, content})

    return makePatchRequest(resource, content, auth)
  }

  const setSessionComment = async (session: number, comment: string) => {
    const resource = `/sessions/${session}`
    const content = JSON.stringify({comment})

    const auth = authString({license, apiPassword, httpMethod: 'PATCH', resource, content})

    return makePatchRequest(resource, content, auth)
  }

  const systemInformation = async () => {
    const auth = authString({license, apiPassword, httpMethod: 'GET', resource: '/sysinfo', content: ''})

    return makeGetRequest<SystemInformation>('/sysinfo', auth)
  }

  return {
    authenticate,
    authenticationString,
    clients,
    client,
    closeSession,
    sessions,
    session,
    setAlias,
    setSessionComment,
    systemInformation
  }
}
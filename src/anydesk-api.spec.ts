import {AnyDeskAPI} from './anydesk-api'

// Set before running tests
const license = ''
const apiPassword = ''

describe('AnyDesk API', () => {
  it('should authenticate', async () => {
    const {authenticate, authenticationString} = AnyDeskAPI({license, apiPassword})

    const authString = authenticationString('GET', '/auth')

    expect(authString).toMatch(license)

    const response = await authenticate()

    expect(response["license-id"]).toBe(license)
    expect(response.result).toBe('success')
  })

  it('should fetch clients', async () => {
    const {clients, client, setAlias} = AnyDeskAPI({license, apiPassword})

    const devices = await clients({offset: 0, limit: 10, online: true})

    expect(devices.list.length).toBe(devices.selected)

    const offlineDevices = await clients({offset: 0, limit: 10, online: false})

    expect(offlineDevices.list.length).toBe(offlineDevices.selected)

    const c = await client(devices.list[0].cid)

    expect(c.cid).toBe(devices.list[0].cid)

    const currentAlias = c.alias

    const ca = await setAlias(c.cid, 'test-alias-api-ts')

    expect(ca).toBe(true)

    await setAlias(c.cid, null)

    await setAlias(c.cid, currentAlias)
  })

  it('should get sessions', async () => {
    const {sessions, clients, session} = AnyDeskAPI({license, apiPassword})

    const response = await sessions()

    expect(response.cid).toBe(-1)

    const devices = await clients({offset: 0, limit: 1, online: true})

    const client = devices.list[0]

    const sessionsForClient = await sessions(client.cid)

    expect(sessionsForClient.cid).toBe(client.cid)

    const sessionData = await session(sessionsForClient.list[0].sid)

    expect(sessionData.sid).toBe(sessionsForClient.list[0].sid)
  })

  it('should get the system info', async () => {
    const {systemInformation} = AnyDeskAPI({license, apiPassword})

    const response = await systemInformation()

    expect(response.name).toBe('AnyDesk REST')
  })
})
import {authString, contentHash} from './auth'

// Sample data from the docs
const license = '1438129266231705'
const timestamp = 1445440997
const apiPassword = 'UYETICGU2CT3KES'

describe('Authentication', () => {
  it('should generate the content hash', () => {
    const hash = '2jmj7l5rSw0yVb/vlWAYkK/YBwk='

    const content = contentHash('')

    expect(content).toBe(hash)
  })

  it('should match the docs', () => {
    const token = 'T2YsCOj2o3Rb79nLPUgx3Gl+nnw='

    const auth = authString({
      license,
      apiPassword,
      timestamp,
      resource: '/auth',
      httpMethod: 'GET',
      content: ''
    })

    expect(auth).toMatch(`${license}:${timestamp}`)
    expect(auth).toBe(`AD ${license}:${timestamp}:${token}`)
  })
})
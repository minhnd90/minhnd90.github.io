process.env.CONTACT_STORAGE_DIR = 'test-data'
process.env.CONTACT_STORAGE_FILE = 'test-contact.log'

import { persistContactRequest } from '../../../lib/contact'
import { promises as fs } from 'fs'
import path from 'path'

describe('persistContactRequest', () => {
  const testDir = path.join(process.cwd(), 'test-data')
  const testFile = 'test-contact.log'

  beforeEach(async () => {
    // Clean up
    try {
      await fs.rm(path.join(testDir, testFile), { force: true })
      await fs.rmdir(testDir, { recursive: true })
    } catch {}
  })

  afterEach(async () => {
    // Clean up
    try {
      await fs.rm(path.join(testDir, testFile), { force: true })
      await fs.rmdir(testDir, { recursive: true })
    } catch {}
  })

  it('should persist contact request to file', async () => {
    const data = {
      name: 'Test User',
      email: 'test@example.com',
      message: 'Hello world',
      submittedAt: '2023-01-01T00:00:00.000Z',
      clientIp: '127.0.0.1',
    }

    await persistContactRequest(data)

    const filePath = path.join(testDir, testFile)
    const content = await fs.readFile(filePath, 'utf8')
    const lines = content.trim().split('\n')
    expect(lines).toHaveLength(1)

    const parsed = JSON.parse(lines[0])
    expect(parsed).toEqual(data)
  })
})

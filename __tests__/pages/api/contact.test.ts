import { NextApiRequest, NextApiResponse } from 'next'
import handler from '@/pages/api/contact'

// Mock axios
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}))

// Mock nodemailer
jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(() => Promise.resolve({ messageId: 'test-id' })),
  })),
}))

describe('/api/contact', () => {
  let req: Partial<NextApiRequest>
  let res: Partial<NextApiResponse>
  let statusMock: jest.Mock
  let jsonMock: jest.Mock

  beforeEach(() => {
    jsonMock = jest.fn()
    statusMock = jest.fn(() => ({ json: jsonMock }))

    req = {
      method: 'POST',
      body: {},
    }

    res = {
      status: statusMock as any,
    }

    // Clear environment variables
    delete process.env.SMTP_HOST
    delete process.env.TELEGRAM_BOT_TOKEN
  })

  it('returns 405 for non-POST requests', async () => {
    req.method = 'GET'

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(statusMock).toHaveBeenCalledWith(405)
    expect(jsonMock).toHaveBeenCalledWith({ error: 'METHOD_NOT_ALLOWED' })
  })

  it('returns 400 for invalid data', async () => {
    req.body = {
      type: 'invalid',
      name: 'A',
      email: 'invalid-email',
    }

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(statusMock).toHaveBeenCalledWith(400)
    expect(jsonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        error: 'INVALID_DATA',
        details: expect.any(Object),
      })
    )
  })

  it('returns 200 for valid data', async () => {
    req.body = {
      type: 'advertiser',
      name: 'John Doe',
      company: 'Test Company',
      email: 'john@example.com',
      phone: '+77001234567',
      message: 'This is a test message that is long enough',
    }

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(statusMock).toHaveBeenCalledWith(200)
    expect(jsonMock).toHaveBeenCalledWith({ ok: true })
  })

  it('validates required fields', async () => {
    req.body = {
      type: 'partner',
      name: 'Jo', // too short
      company: 'Test Company',
      email: 'test@example.com',
      phone: '123', // too short
      message: 'Short', // too short
    }

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(statusMock).toHaveBeenCalledWith(400)
  })

  it('validates email format', async () => {
    req.body = {
      type: 'fleet',
      name: 'John Doe',
      company: 'Test Company',
      email: 'not-an-email',
      phone: '+77001234567',
      message: 'This is a test message',
    }

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(statusMock).toHaveBeenCalledWith(400)
  })

  it('validates type enum', async () => {
    req.body = {
      type: 'unknown_type',
      name: 'John Doe',
      company: 'Test Company',
      email: 'test@example.com',
      phone: '+77001234567',
      message: 'This is a test message',
    }

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(statusMock).toHaveBeenCalledWith(400)
  })
})


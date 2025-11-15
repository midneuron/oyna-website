import { render, screen, fireEvent } from '@testing-library/react'
import { useRouter } from 'next/router'
import LanguageSwitcher from '@/components/common/LanguageSwitcher'

// Mock Next.js router
jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}))

describe('LanguageSwitcher', () => {
  const mockPush = jest.fn()
  const mockRouter = {
    push: mockPush,
    locale: 'ru',
    asPath: '/',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it('renders language switcher with RU and EN buttons', () => {
    render(<LanguageSwitcher />)

    expect(screen.getByText('RU')).toBeInTheDocument()
    expect(screen.getByText('EN')).toBeInTheDocument()
  })

  it('highlights the current locale', () => {
    render(<LanguageSwitcher />)

    const ruButton = screen.getByText('RU')
    expect(ruButton).toHaveClass('text-brand-teal')
    expect(ruButton).toHaveClass('font-semibold')
  })

  it('changes locale when clicking on a different language', () => {
    render(<LanguageSwitcher />)

    const enButton = screen.getByText('EN')
    fireEvent.click(enButton)

    expect(mockPush).toHaveBeenCalledWith('/', '/', {
      locale: 'en',
      scroll: false,
    })
  })

  it('has proper aria-labels for accessibility', () => {
    render(<LanguageSwitcher />)

    expect(screen.getByLabelText('Switch to RU')).toBeInTheDocument()
    expect(screen.getByLabelText('Switch to EN')).toBeInTheDocument()
  })

  it('applies correct styles for non-active locale', () => {
    render(<LanguageSwitcher />)

    const enButton = screen.getByText('EN')
    expect(enButton).toHaveClass('text-white/70')
    expect(enButton).toHaveClass('hover:text-white')
  })
})


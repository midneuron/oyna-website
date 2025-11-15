import { render, screen } from '@testing-library/react'
import SectionHeading from '@/components/common/SectionHeading'

describe('SectionHeading', () => {
  it('renders title correctly', () => {
    render(<SectionHeading title="Test Title" />)

    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  it('renders eyebrow when provided', () => {
    render(<SectionHeading eyebrow="Test Eyebrow" title="Test Title" />)

    expect(screen.getByText('Test Eyebrow')).toBeInTheDocument()
  })

  it('renders description when provided', () => {
    render(
      <SectionHeading
        title="Test Title"
        description="Test Description"
      />
    )

    expect(screen.getByText('Test Description')).toBeInTheDocument()
  })

  it('does not render eyebrow when not provided', () => {
    render(<SectionHeading title="Test Title" />)

    expect(screen.queryByText('Test Eyebrow')).not.toBeInTheDocument()
  })

  it('does not render description when not provided', () => {
    render(<SectionHeading title="Test Title" />)

    expect(screen.queryByText('Test Description')).not.toBeInTheDocument()
  })

  it('applies center alignment when specified', () => {
    const { container } = render(
      <SectionHeading title="Test Title" align="center" />
    )

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveClass('text-center')
    expect(wrapper).toHaveClass('mx-auto')
    expect(wrapper).toHaveClass('max-w-3xl')
  })

  it('applies left alignment by default', () => {
    const { container } = render(<SectionHeading title="Test Title" />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).not.toHaveClass('text-center')
  })

  it('applies light variant styles correctly', () => {
    render(
      <SectionHeading
        title="Test Title"
        description="Test Description"
        variant="light"
      />
    )

    const title = screen.getByText('Test Title')
    const description = screen.getByText('Test Description')

    expect(title).toHaveClass('text-white')
    expect(description).toHaveClass('text-white/80')
  })

  it('applies dark variant styles by default', () => {
    render(
      <SectionHeading title="Test Title" description="Test Description" />
    )

    const title = screen.getByText('Test Title')
    const description = screen.getByText('Test Description')

    expect(title).toHaveClass('text-night')
    expect(description).toHaveClass('text-slate')
  })

  it('applies correct styling to eyebrow', () => {
    render(<SectionHeading eyebrow="Test Eyebrow" title="Test Title" />)

    const eyebrow = screen.getByText('Test Eyebrow')
    expect(eyebrow).toHaveClass('text-sm')
    expect(eyebrow).toHaveClass('font-semibold')
    expect(eyebrow).toHaveClass('uppercase')
    expect(eyebrow).toHaveClass('text-brand-teal')
  })
})


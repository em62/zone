import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import FocusPage from '@/app/focus/page'

describe('focusコンポーネント', () => {
  test('レンダリング', () => {
    render(<FocusPage />)
    const heading = screen.getByText('focus')
    expect(heading).toBeInTheDocument()
  })
})

import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PrepairFirstPage from './page'
import FocusPage from './page'

describe('focusコンポーネント', () => {
  test('レンダリング', () => {
    render(<FocusPage />)
    const heading = screen.getByText('focus')
    expect(heading).toBeInTheDocument()
  })
})

import Home from '@/app/page'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import PrepairFirstPage from './page'
import BreakPage from './page'

describe('breakコンポーネント', () => {
  test('レンダリング', () => {
    render(<BreakPage />)
    const heading = screen.getByText('break page')
    expect(heading).toBeInTheDocument()
  })
})

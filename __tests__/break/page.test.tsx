import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import BreakPage from '@/app/break/page'
import { AppRouterContextProviderMock } from '../../provider/app-router-context-provider-mock'

describe('breakコンポーネント', () => {
  test('レンダリング', () => {
    const push = jest.fn()
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <BreakPage />
      </AppRouterContextProviderMock>,
    )
    const heading = screen.getByText('リラックスしましょう。')
    expect(heading).toBeInTheDocument()
  })
})

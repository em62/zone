import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { AppRouterContextProviderMock } from '../../provider/app-router-context-provider-mock'
import FocusPage from '@/app/focus/page'

describe('focusコンポーネント', () => {
  test('レンダリング', () => {
    const push = jest.fn()
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <FocusPage />
      </AppRouterContextProviderMock>,
    )
    const heading = screen.getByText('focus')
    expect(heading).toBeInTheDocument()
  })
})

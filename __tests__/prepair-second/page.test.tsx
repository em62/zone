import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PrepairSecondPage from "@/app/prepair-second/page";
import { AppRouterContextProviderMock } from "../../provider/app-router-context-provider-mock";

describe("PrepairSecondPageコンポーネント", () => {
  test("テキストのレンダリングを確認する", () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <PrepairSecondPage />
      </AppRouterContextProviderMock>,
    );
    const heading = screen.getByText("本を見つめましょう");
    const text = screen.getByText("🌲");
    expect(heading).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});

import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { AppRouterContextProviderMock } from "../../provider/app-router-context-provider-mock";
import PrepairFirstPage from "@/app/prepair-first/page";

describe("PrepairFirstPageコンポーネント", () => {
  test("テキストのレンダリングを確認する", () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <PrepairFirstPage />
      </AppRouterContextProviderMock>,
    );
    const heading = screen.getByText("画面の表示に合わせて深呼吸をします。");
    expect(heading).toBeInTheDocument();
  });
});

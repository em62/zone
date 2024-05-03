import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PrepairFirstPage from "../../app/prepair-first/page";

describe("PrepairFirstPageコンポーネント", () => {
  test("テキストのレンダリングを確認する", () => {
    render(<PrepairFirstPage />);
    const heading = screen.getByText("画面の表示に合わせて深呼吸をします。");
    const text = screen.getByText("息を吸って");
    expect(heading).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});

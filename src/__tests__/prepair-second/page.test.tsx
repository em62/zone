import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PrepairSecondPage from "@/app/prepair-second/page";

describe("PrepairSecondPageコンポーネント", () => {
  test("テキストのレンダリングを確認する", () => {
    render(<PrepairSecondPage />);
    const heading = screen.getByText("本を見つめましょう");
    const text = screen.getByText("🌲");
    expect(heading).toBeInTheDocument();
    expect(text).toBeInTheDocument();
  });
});

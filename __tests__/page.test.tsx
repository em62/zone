import Home from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Homeコンポーネント", () => {
  test("タイトルのレンダリングを確認する", () => {
    render(<Home />);
    const heading = screen.getByText("ZONE");
    expect(heading).toBeInTheDocument();
  });

  test("Buttonコンポーネントのレンダリングを確認する", () => {
    render(<Home />);
    const button = screen.getByRole("button");
    expect(button).toBeInTheDocument();
  });

  test("Linkコンポーネントのレンダリングを確認する", () => {
    render(<Home />);
    const link = screen.getByRole("link");
    expect(link).toBeInTheDocument();
  });
});

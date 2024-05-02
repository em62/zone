import Home from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

describe("Homeコンポーネント", () => {
  test("レンダリング", () => {
    render(<Home />);
    const heading = screen.getByText("front");
    expect(heading).toBeInTheDocument();
  });
});

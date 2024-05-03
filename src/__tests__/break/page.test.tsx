import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import BreakPage from "../../app/break/page";

describe("breakコンポーネント", () => {
  test("レンダリング", () => {
    render(<BreakPage />);
    const heading = screen.getByText("break page");
    expect(heading).toBeInTheDocument();
  });
});

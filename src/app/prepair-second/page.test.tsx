import Home from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PrepairSecondPage from "./page";

describe("prepairsecondコンポーネント", () => {
  test("レンダリング", () => {
    render(<PrepairSecondPage />);
    const heading = screen.getByText("prepair second");
    expect(heading).toBeInTheDocument();
  });
});

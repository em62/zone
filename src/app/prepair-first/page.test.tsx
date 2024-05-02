import Home from "@/app/page";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import PrepairFirstPage from "./page";

describe("prepairfirstコンポーネント", () => {
  test("レンダリング", () => {
    render(<PrepairFirstPage />);
    const heading = screen.getByText("prepair-first");
    expect(heading).toBeInTheDocument();
  });
});

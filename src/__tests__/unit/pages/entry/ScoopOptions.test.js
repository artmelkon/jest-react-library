import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import ScoopOption from "../../../../pages/entry/ScoopOption";

describe("Scoop Option Unit Test", () => {
  it("sould render input box red if the value is-invalid", async () => {
    // render(<ScoopOption />);
    render(<ScoopOption updateItemCount={jest.fn()} />); // both work

    const vanillaInput = screen.getByRole("spinbutton");
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "-1");
    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1.1");
    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "11");
    expect(vanillaInput).toHaveClass("is-invalid");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(vanillaInput).not.toHaveClass("is-invalid");
  });
});

import { render, screen, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import SummaryForm from "../../../pages/summary/SummaryForm";

describe("Summary Form", () => {
  it("should return checkbox unchecked by default", () => {
    render(<SummaryForm />);

    const checkboxElm = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const buttonElm = screen.getByRole("button", { name: /confirm order/i });
    expect(checkboxElm).not.toBeChecked();
    expect(buttonElm).toBeDisabled();
  });
  it('should return checkbox "Enabled"', () => {
    render(<SummaryForm />);

    const checkboxElm = screen.getByRole("checkbox");
    const buttonElm = screen.getByRole("button");
    userEvent.click(checkboxElm);
    expect(checkboxElm.errors).toBeUndefined();
    expect(checkboxElm).toBeChecked();
    expect(buttonElm).toBeEnabled();
  });
  it("should unchenking checkbox should disable button", () => {
    render(<SummaryForm />);

    const checkboxElm = screen.getByRole("checkbox", {
      name: /terms and conditions/i,
    });
    const buttonElm = screen.getByRole("button", { name: /confirm order/i });
    userEvent.click(checkboxElm);
    expect(checkboxElm).toBeChecked();
    expect(buttonElm).toBeEnabled();
    userEvent.click(checkboxElm);
    expect(checkboxElm).not.toBeChecked();
    expect(buttonElm).toBeDisabled();
  });

  it("should popover on hover", async () => {
    render(<SummaryForm />);

    // popover starts out hidden
    const nullPopover = screen.queryByText(
      /no ice cream will actually be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();

    // popover apears upon mouseover of checkbox label
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    userEvent.hover(termsAndConditions);

    const popover = screen.getByText(
      /no ice cream will actually be delivered/i
    );
    expect(popover).toBeInTheDocument();

    // popover disabpears when mouse exits checkbox
    userEvent.unhover(termsAndConditions);
    const removePopover = await waitForElementToBeRemoved(() =>
      screen.queryByText(/no ice cream will actually be delivered/i)
    );
    expect(removePopover).toBeUndefined();
  });
});

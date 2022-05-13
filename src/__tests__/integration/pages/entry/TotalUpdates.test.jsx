import { render, screen } from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../../../../pages/entry/options";
import OrderEntry from "../../../../pages/entry/OrderEntry";
// import { OrderDetailsProvider } from "../../../../context/OrderDetails";

describe("Total Update", () => {
  describe("Scoops Subtotal", () => {
    it.skip("should rturn updated scoop subtotal when scoops change", async () => {
      // wrapper - applied dynamically - check documentation https://testing-library.com/docs/react-testing-library/setup
      render(<Options optionType="scoops" />);

      // make sure total start out $0.00
      const scoopsSubtotal = screen.getByText("Scoops total: $", {
        exact: false,
      });

      expect(scoopsSubtotal).toHaveTextContent("0.00");

      // update vanilla scoops to 1 and check the subtotal
      const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, "1");
      expect(scoopsSubtotal).toHaveTextContent("2.00");

      // update chocolate scoops to 2 and check the subtotal
      // spinbutton - For documentation visit https://accessibilityresources.org/spinbutton
      const chocolateInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
      });
      userEvent.clear(chocolateInput);
      userEvent.type(chocolateInput, "2");
      expect(scoopsSubtotal).toHaveTextContent("6.00");
    });
    it.skip("should return chocolate scoop subtotal when scoops change", async () => {
      render(<Options optionType="scoops" />);

      // make sure total start out $0.00
      const scoopSubtotal = screen.getByText("Scoops total: $", {
        exact: false,
      });

      const chocolateInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
      });
      userEvent.clear(chocolateInput);
      userEvent.type(chocolateInput, "2");

      expect(scoopSubtotal).toHaveTextContent("4.00");
    });
  });

  describe("Toppings Subtotal", () => {
    it.skip('should render Subtotal "0.00"', async () => {
      // wrapper applied dynamically
      render(<Options optionType="toppings" />);

      const toppingSubtotal = screen.getByText("Toppings total: $", {
        exact: false,
      });

      expect(toppingSubtotal).toHaveTextContent("0.00");
    });
    it.skip("should return a checked topping", async () => {
      render(<Options optionType="toppings" />);

      const toppingSubtotal = screen.getByText("Toppings total: $", {
        exact: false,
      });
      const cherriesTopping = await screen.findByRole("checkbox", {
        name: "Cherries",
      });
      userEvent.click(cherriesTopping);
      expect(cherriesTopping).toBeChecked();
      expect(toppingSubtotal).toHaveTextContent("1.50");

      const hotFudgeTopping = await screen.findByRole("checkbox", {
        name: "Hot fudge",
      });
      userEvent.click(hotFudgeTopping);
      expect(hotFudgeTopping).toBeChecked();
      expect(toppingSubtotal).toHaveTextContent("3.00");

      userEvent.click(hotFudgeTopping);
      expect(hotFudgeTopping).not.toBeChecked();
      expect(toppingSubtotal).toHaveTextContent("1.50");
    });
  });
});

describe("Grand Total", () => {
  it("should return grand total updates properly if scoop is added firts", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    // check if grand total starts out at $0.00
    expect(grandTotal).toHaveTextContent("0.00");

    // update with vanilla scoops to 2 and update grand total
    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("4.00");

    // add cherries topping and check forr grand total update
    const cherriesTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });
    userEvent.click(cherriesTopping);
    expect(cherriesTopping).toBeChecked();
    expect(grandTotal).toHaveTextContent("5.50");
  });
  it("should return grand total updates properly if topping is added firts", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const cherriesTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesTopping);
    expect(cherriesTopping).toBeChecked();
    expect(grandTotal).toHaveTextContent("1.50");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");
  });
  it("should return grand total updates properly if item is removed", async () => {
    render(<OrderEntry />);

    const grandTotal = screen.getByRole("heading", {
      name: /grand total: \$/i,
    });

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    const cherriesTopping = await screen.findByRole("checkbox", {
      name: "Cherries",
    });

    userEvent.click(cherriesTopping);
    expect(cherriesTopping).toBeChecked();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "2");
    expect(grandTotal).toHaveTextContent("5.50");

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");

    userEvent.click(cherriesTopping);
    expect(cherriesTopping).not.toBeChecked();
    expect(grandTotal).toHaveTextContent("2.00");
  });
});

import { render, screen } from "../../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";

import Options from "../../../../pages/entry/options";
import { OrderDetailsProvider } from "../../../../context/OrderDetails";

describe("Total Update", () => {
  describe("Scoops Subtotal", () => {
    it("should rturn updated scoop subtotal when scoops change", async () => {
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
      const chocolateInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
      });
      userEvent.clear(chocolateInput);
      userEvent.type(chocolateInput, "2");

      expect(scoopsSubtotal).toHaveTextContent("6.00");
    });
    it("should return chocolate scoop subtotal when scoops change", async () => {
      render(<Options optionType="scoops" />);

      // make sure total start out $0.00
      const scoopSubtotal = screen.getByText("Scoops total: $", {
        exact: false
      });

      const chocolateInput = await screen.findByRole("spinbutton", {
        name: "Chocolate",
      });
      userEvent.clear(chocolateInput);
      userEvent.type(chocolateInput, "2");

      expect(scoopSubtotal).toHaveTextContent("4.00");
    });
  });
});

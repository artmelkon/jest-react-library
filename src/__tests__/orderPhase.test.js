import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe("Order Phases for Happy Path", () => {
  describe("render the app for testing", () => {
    it("add ice cream scoops and toppings", async () => {
      render(<App />);

      const grandTotal = await screen.findByRole("heading", {
        name: /grand total: \$/i,
      });
      const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      const chocolateInput = screen.getByRole("spinbutton", {
        name: "Chocolate",
      });
      const cherriesTopping = await screen.findByRole("checkbox", {
        name: "Cherries",
      });

      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, "1");
      userEvent.clear(chocolateInput);
      userEvent.type(chocolateInput, "2");
      userEvent.click(cherriesTopping);
      expect(cherriesTopping).toBeChecked();
      expect(grandTotal).toHaveTextContent("7.50");

      // "find and click order button"
      const placeOrder = screen.getByRole("button", {
        name: /order sundae/i,
      });
      userEvent.click(placeOrder);

      //"check summary infromation based on order"
      const summaryPage = await screen.findByRole("heading", {
        name: "Order Summary",
      });
      expect(summaryPage).toBeInTheDocument();

      const scoopsSummary = screen.getByRole("heading", {
        name: "Scoops: $6.00",
      });
      expect(scoopsSummary).toBeInTheDocument();
      const toppingsSummary = screen.getByRole("heading", {
        name: "Toppings: $1.50",
      });
      expect(toppingsSummary).toBeInTheDocument();

      expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
      expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
      expect(screen.getByText("Cherries")).toBeInTheDocument();

      // click the button to confirm the order
      const orderTerms = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
      });
      userEvent.click(orderTerms);
      expect(orderTerms).toBeChecked();

      const confirmOrder = screen.getByRole("button", {
        name: /confirm order/i,
      });
      userEvent.click(confirmOrder);

      // // confirm order number on confirmation page
      // const thanYourHeading = await screen.findByRole("heading", {
      //   name: /thank you/i,
      // });
      // expect(thanYourHeading).toBeInTheDocument();

      // const orderNumber = screen.getByText(/your order number/i);
      // expect(orderNumber).toBeInTheDocument();
      // // click new order on confirmation page
      // const newOrderBtn = screen.getByRole("button", {
      //   name: /new order/i,
      // });
      // userEvent.click(newOrderBtn);
      // // check that scoops and topping are reset
      // expect(grandTotal).toHaveTextContent("0.00");

      // // do w need to avoid test errors?
      // await screen.findByRole("spinner", { name: "Vanilla" });
      // await screen.findByRole("checkbox", { name: "Cherries" });
    });
  });
});

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "../App";

describe("Order Phases for Happy Path", () => {
  describe("render the app for testing", () => {
    it("add ice cream scoops and toppings", async () => {
      render(<App />);

      /*
      add ice cream scoops and toppings to your selection
      =================================================== */
      const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, "1");
      const chocolateInput = screen.getByRole("spinbutton", {
        name: "Chocolate",
      });
      userEvent.clear(chocolateInput);
      userEvent.type(chocolateInput, "2");
      const cherriesTopping = await screen.findByRole("checkbox", {
        name: "Cherries",
      });
      userEvent.click(cherriesTopping);
      expect(cherriesTopping).toBeChecked();

      const submitOrder = screen.getByRole("button", {
        name: /order sundae/i,
      });
      userEvent.click(submitOrder);
      /* END OF
       * add ice cream scoops and toppings to your selection
       */

      /**
       * Check summary infromation based on order selections
      ======================================================*/
      const summaryHeading = screen.getByRole("heading", {
        name: "Order Summary",
      });
      expect(summaryHeading).toBeInTheDocument();
      const scoopsHeading = screen.getByRole("heading", {
        name: "Scoops: $6.00",
      });
      expect(scoopsHeading).toBeInTheDocument();
      const toppingsHeading = screen.getByRole("heading", {
        name: "Toppings: $1.50",
      });
      expect(toppingsHeading).toBeInTheDocument();

      // check summary option items
      expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
      expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
      expect(screen.getByText("Cherries")).toBeInTheDocument();

      const tcCheckbox = screen.getByRole("checkbox", {
        name: /agree to/i,
      });
      userEvent.click(tcCheckbox);
      expect(tcCheckbox).toBeChecked();

      const confirmOrderButton = screen.getByRole("button", {
        name: /confirm order/i,
      });
      userEvent.click(confirmOrderButton);
      /** END OF
       * Check summary infromation based on order selections
       */

      /**
       * Confirm order number on confirmation page
       * this pages uses async because there is a POST request
       * then we need to click button to reset the order form
       */
      const confirmNumber = await screen.findByText(/order number/i);
      expect(confirmNumber).toBeInTheDocument();

      const newOrderBtn = screen.getByRole("button", {
        name: /new order/i,
      });
      userEvent.click(newOrderBtn);
      /** END of Conrimation page test */

      /**
       * Check the scoops and toppings have been rest
       */
      const scoopsTotal = screen.getByText("Scoops total: $0.00");
      expect(scoopsTotal).toBeInTheDocument();
      const toppingsTatal = screen.getByText("Toppings total: $0.00");

      // do we need to avoid test errors?
      await screen.findByRole("spinbutton", { name: "Vanilla" });
      await screen.findByRole("checkbox", { name: "Cherries" });
    });
  });
  describe("Confirmaton Page", () => {
    it('should render the page after "Loading..." message disapears', async () => {
      render(<App />);

      // order page
      const vanillaInput = await screen.findByRole("spinbutton", {
        name: "Vanilla",
      });
      userEvent.clear(vanillaInput);
      userEvent.type(vanillaInput, "1");

      /* commented out for test bellow checking for Toppings headier when no topping is selected */
      // const cherriesTopping = await screen.findByRole("checkbox", {
      //   name: "Cherries",
      // });
      // userEvent.click(cherriesTopping);
      // expect(cherriesTopping).toBeChecked();

      const grandTotal = screen.getByRole("heading", {
        name: /grand total: \$/i,
      });
      expect(grandTotal).toHaveTextContent("2.00");
      // expect(grandTotal).toHaveTextContent("3.50");

      const orderSundae = screen.getByRole("button", {
        name: /order sundae/i,
      });
      userEvent.click(orderSundae);

      // summary page
      const orderSummary = screen.getByText("Order Summary");
      expect(orderSummary).toBeInTheDocument();

      const tcCheckbox = screen.getByRole("checkbox", {
        name: /terms and conditions/i,
      });
      userEvent.click(tcCheckbox);
      const confirmOrder = await screen.findByRole("button", {
        name: /confirm order/i,
      });
      userEvent.click(confirmOrder);

      // Confirmation page
      const removeLoading = await waitForElementToBeRemoved(() => screen.queryByText(/loading/i));
      expect(removeLoading).toBeUndefined();

      const thankYouHeader = screen.getByRole('heading', {
        name: /thank you/i
      });
      expect(thankYouHeader).toBeInTheDocument();

      const toppingHeader = screen.queryByRole('headier', {
        name: /toppings/i
      });
      expect(toppingHeader).not.toBeInTheDocument()
    });
  });
});

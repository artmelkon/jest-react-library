import {
  render,
  screen,
  waitFor,
} from "../../../../test-utils/testing-library-utils";
import { rest } from "msw";

import { server } from "../../../../mocks/server";
import OrderEntry from "../../../../pages/entry/OrderEntry";
import userEvent from "@testing-library/user-event";

describe("ERROR - routes", () => {
  const url = "http://localhost:3030";

  it("shoulr return error handler for scoops and topping route", async () => {
    server.resetHandlers(
      rest.get(url + "/scoops", (req, res, ctx) => {
        return res(ctx.status(500));
      }),
      rest.get(url + "/toppings", (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    render(<OrderEntry />);

    await waitFor(async () => {
      const alert = await screen.findAllByRole("alert");
      expect(alert).toHaveLength(2);
    });
  });
  it("should disable the order button if scoops count is 0", async () => {
    render(<OrderEntry />);

    const orderButton = screen.getByRole("button", {
      name: /order sundae/i,
    });
    expect(orderButton).toBeDisabled();

    const vanillaInput = await screen.findByRole("spinbutton", {
      name: "Vanilla",
    });
    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "1");

    expect(orderButton).toBeEnabled();

    userEvent.clear(vanillaInput);
    userEvent.type(vanillaInput, "0");

    expect(orderButton).toBeDisabled();
  });
});

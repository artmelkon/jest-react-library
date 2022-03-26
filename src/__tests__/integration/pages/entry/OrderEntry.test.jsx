import { render, screen, waitFor } from "@testing-library/react";
import { rest } from "msw";

import { server } from "../../../../mocks/server";
import OrderEntry from "../../../../pages/entry/OrderEntry";

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
});

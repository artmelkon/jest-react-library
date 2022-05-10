import { render, screen } from "../../../../test-utils/testing-library-utils";

import Options from "../../../../pages/entry/Options";
import {OrderDetailsProvider} from '../../../../context/OrderDetails';

describe("GET /scoope", () => {
  it("should display image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages.errors).toBeUndefined();
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((elm) => elm.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);

    expect(altText).toEqual(expect.arrayContaining(["Vanilla scoop"]));
  });
});

describe("GET /toppings", () => {
  it("should display image for each topping opton from server", async () => {
    render(<Options optionType="toppings" />);

    const toppingImages = await screen.findAllByRole("img", {
      name: /topping$/i,
    });
    expect(toppingImages.errors).toBeUndefined();
    expect(toppingImages).toHaveLength(3);

    const altText = toppingImages.map((elm) => elm.alt);
    expect(altText).toEqual([
      "Cherries topping",
      "M&Ms topping",
      "Hot fudge topping",
    ]);
    expect(altText).toEqual(expect.arrayContaining(["Cherries topping"]));
  });
});

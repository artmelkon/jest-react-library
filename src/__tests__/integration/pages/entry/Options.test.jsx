import { render, screen } from "@testing-library/react";

import Options from "../../../../pages/entry/Options";

describe("GET /scoope", () => {
  it("should display image for each scoop option from server", async () => {
    render(<Options optionType="scoops" />);

    const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
    expect(scoopImages).toHaveLength(2);

    const altText = scoopImages.map((elm) => elm.alt);
    expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);

    expect(altText).toEqual(
      expect.arrayContaining(["Chocolate scoop", "Vanilla scoop"])
    );
  });
});

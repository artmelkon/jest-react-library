import {rest} from 'msw';

const uri = 'http://localhost:3030';
export const handlers = [
  rest.get(uri + "/scoops", (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),
  rest.get(uri + '/toppings', (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),
  rest.post(uri + '/order', (req, res, ctx) => {
    return res(
      ctx.json({ orderNumber: "123456" })
    );
  }),
];

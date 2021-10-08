import Cors from "cors";

// Initializing the cors middleware
const cors = Cors({
  origin: "*",
  methods: ["GET", "POST", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

const token = "sdlfk345lksdçlrgfkw45lk345";

const events = [
  {
    eventId: "sdf54a6sd4f65asd6f45a6sdf",
    eventType: "CANCELLATION_REQUESTED",
    orderId: "bbb",
    orderUrl: "http://example.com",
    createdAt: "2019-08-24T14:15:22Z",
  },
  {
    eventId: "sd4f565a4sdf654as6df456as5d",
    eventType: "CREATED",
    orderId: "bbb",
    orderUrl: "http://example.com",
    createdAt: "2019-08-24T14:15:22Z",
  },
  {
    eventId: "as56df456a4sd6f45a6sdf465asd6f",
    eventType: "CONCLUDED",
    orderId: "bbb",
    orderUrl: "http://example.com",
    createdAt: "2019-08-24T14:15:22Z",
  },
];

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { authorization } = req.headers;

  if (authorization.slice(7) !== token) {
    return res.status(403).json({
      title: "Unexpected error",
      status: 500,
    });
  }

  res.status(200).json(events);
}

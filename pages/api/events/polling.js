import Cors from "cors";
import { v4 as uuidv4 } from 'uuid'
import faker from 'faker'

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


const eventTypes = ["CREATED", "CONFIRMED", "DISPATCHED", "READY_FOR_PICKUP", "PICKUP_AREA_ASSIGNED", "CONCLUDED", "CANCELLATION_REQUESTED", "CANCELLATION_REQUEST_DENIED", "CANCELLED", "ORDER_CANCELLATION_REQUEST"]

const events = Array.from({length: 2000}, () => ({
  eventId: uuidv4(),
  eventType: faker.helpers.randomize(eventTypes),
  orderId: "bbb",
  orderUrl: "https://api-delivery-test.vercel.app/api",
  createdAt: new Date().toISOString(),
}))


export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  res.status(200).json(events);
}

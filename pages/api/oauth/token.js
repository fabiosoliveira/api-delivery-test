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

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { clientId, clientSecret, grantType } = req.body;

  if (
    clientId !== "123456" ||
    clientSecret !== 123456 ||
    grantType !== "client_credentials"
  ) {
    return res.status(401).json({ error: "Bad credential" });
  }

  const response = {
    accessToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIzMDM0Q0UzRi04NTQ4LTMzQjYtRDlCMS02QjBDOEU4REM2QjIiLCJTZXNzaW9uSWQiOiI5YzUwYjY0OS1mZjA2LTQ4ZDMtYjYyNi1hNTU0OTI5ZTk1M2QiLCJpc3MiOiJsb2NhbGhvc3Q6MzMzMyIsImlhdCI6MTYzMzQ0MzkzOCwiZXhwIjoxNjMzNDUxMTM4fQ.JAoK8OP9ZYq1UQeabOlWUXZWcy9lak4l09UQX1Ox-4s",
    tokenType: "bearer",
    expiresIn: 30,
  };

  res.status(200).json(response);
}

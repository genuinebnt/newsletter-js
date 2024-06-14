import app from "../src/app";
import { Server } from "http";
import axios from "axios";

const spawnApp = async (): Promise<Server> => {
  return new Promise((resolve, reject) => {
    const server = app.listen(8000, () => {
      console.log(`Server starting on port 8000`);
      resolve(server);
    });

    server.on("error", (err) => {
      console.error(`Failed to start server on port 8000: ${err}`);
      reject(err);
    });
  });
};

describe("health check", () => {
  let server: Server;

  beforeAll(async () => {
    server = await spawnApp();
  });

  afterAll(async () => {
    server.close();
  });

  test("health check works", async () => {
    await axios
      .get("http://localhost:8000/healthCheck")
      .then((response) => expect(response.status).toBe(200));
  });

  test("subscribe returns 200 for valid form data", async () => {
    let body = "name=genuine&email=genuine.basilnt%40gmail.com";
    await axios
      .post("http://localhost:8000/subscriptions", body, {
        headers: {
          "Content-Type": "applicaton/x-www-form-urlencoded",
        },
      })
      .then((response) => expect(response.status).toBe(200));
  });

  test("subscribe returns 400 when data is missing", async () => {
    let testCases = [
      { body: "name=genuine", errorMessage: "missing email" },
      { body: "email=genuine.basilnt@gmail.com", errorMessage: "missing name" },
      { body: "", errorMessage: "missing name and email" },
    ];

    for (const { body, errorMessage } of testCases) {
      await axios
        .post("http://localhost:8000/subscriptions", body, {
          headers: {
            "Content-Type": "applicaton/x-www-form-urlencoded",
          },
        })
        .then((response) => expect(response.statusText).toBe(errorMessage));
    }
  });
});

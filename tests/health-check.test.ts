import request from "supertest";

import app from "../src/app";

describe("health check", () => {
  test("health check works", async () => {
    const res = await request(app).get("/healthCheck");
    expect(res.statusCode).toBe(200);
  });

  test("subscribe returns 200 for valid form data", async () => {
    let body = "name=genuine&email=genuine.basilnt%40gmail.com"
    const res = await request(app).post("/subscriptions").set("Content-Type", "applicaton/x-www-form-urlencoded");
    expect(res.statusCode).toBe(200);
  })
});

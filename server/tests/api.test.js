import request from "supertest";
import app from "../server.js";

describe("Giftora API Health", () => {
  it("should return 200 OK for the health check endpoint", async () => {
    const res = await request(app).get("/api/health");
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty("ok", true);
  });

  it("should return products catalog", async () => {
    const res = await request(app).get("/api/products");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe("Auth Flow", () => {
  it("should return 401 for unauthorized /me access", async () => {
    const res = await request(app).get("/api/auth/me");
    expect(res.statusCode).toEqual(401);
  });
});

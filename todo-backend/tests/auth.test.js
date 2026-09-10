process.env.JWT_SECRET = process.env.JWT_SECRET || "test_secret_key";

const request = require("supertest");
const app = require("../app");
const { connect, closeDatabase, clearDatabase } = require("./testDb");

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const validUser = {
  name: "Test User",
  email: "test@example.com",
  password: "password123",
};

describe("POST /api/auth/register", () => {
  it("registers a new user and returns a token", async () => {
    const res = await request(app).post("/api/auth/register").send(validUser);

    expect(res.status).toBe(201);
    expect(res.body.token).toBeDefined();
    expect(res.body.user.email).toBe(validUser.email);
    expect(res.body.user.password).toBeUndefined();
  });

  it("rejects duplicate email registration", async () => {
    await request(app).post("/api/auth/register").send(validUser);
    const res = await request(app).post("/api/auth/register").send(validUser);

    expect(res.status).toBe(409);
  });

  it("rejects an invalid email", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validUser, email: "not-an-email" });

    expect(res.status).toBe(422);
  });

  it("rejects a short password", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({ ...validUser, password: "123" });

    expect(res.status).toBe(422);
  });
});

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await request(app).post("/api/auth/register").send(validUser);
  });

  it("logs in with correct credentials and returns a token", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: validUser.password });

    expect(res.status).toBe(200);
    expect(res.body.token).toBeDefined();
  });

  it("rejects an incorrect password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: validUser.email, password: "wrongpassword" });

    expect(res.status).toBe(401);
  });

  it("rejects a non-existent email", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: "nouser@example.com", password: validUser.password });

    expect(res.status).toBe(401);
  });
});

process.env.JWT_SECRET = process.env.JWT_SECRET || "test_secret_key";

const request = require("supertest");
const app = require("../app");
const { connect, closeDatabase, clearDatabase } = require("./testDb");

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

const registerAndLogin = async (email = "owner@example.com") => {
  const res = await request(app)
    .post("/api/auth/register")
    .send({ name: "Owner", email, password: "password123" });
  return res.body.token;
};

describe("Todo item routes (protected)", () => {
  it("rejects requests with no auth token", async () => {
    const res = await request(app).get("/api/todo");
    expect(res.status).toBe(401);
  });

  it("rejects requests with an invalid token", async () => {
    const res = await request(app)
      .get("/api/todo")
      .set("Authorization", "Bearer not-a-real-token");
    expect(res.status).toBe(401);
  });

  it("creates and lists a todo item for the authenticated user", async () => {
    const token = await registerAndLogin();

    const createRes = await request(app)
      .post("/api/todo")
      .set("Authorization", `Bearer ${token}`)
      .send({ task: "Write tests", date: "2026-09-09" });

    expect(createRes.status).toBe(201);
    expect(createRes.body.task).toBe("Write tests");
    expect(createRes.body.completed).toBe(false);

    const listRes = await request(app)
      .get("/api/todo")
      .set("Authorization", `Bearer ${token}`);

    expect(listRes.status).toBe(200);
    expect(listRes.body).toHaveLength(1);
  });

  it("marks a todo item as completed", async () => {
    const token = await registerAndLogin();
    const createRes = await request(app)
      .post("/api/todo")
      .set("Authorization", `Bearer ${token}`)
      .send({ task: "Finish resume" });

    const completeRes = await request(app)
      .put(`/api/todo/${createRes.body._id}/completed`)
      .set("Authorization", `Bearer ${token}`);

    expect(completeRes.status).toBe(200);
    expect(completeRes.body.completed).toBe(true);
  });

  it("deletes a todo item", async () => {
    const token = await registerAndLogin();
    const createRes = await request(app)
      .post("/api/todo")
      .set("Authorization", `Bearer ${token}`)
      .send({ task: "Delete me" });

    const deleteRes = await request(app)
      .delete(`/api/todo/${createRes.body._id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(deleteRes.status).toBe(204);
  });

  it("does not allow one user to see or modify another user's todo items", async () => {
    const tokenA = await registerAndLogin("userA@example.com");
    const tokenB = await registerAndLogin("userB@example.com");

    const createRes = await request(app)
      .post("/api/todo")
      .set("Authorization", `Bearer ${tokenA}`)
      .send({ task: "User A's private task" });

    const listAsB = await request(app)
      .get("/api/todo")
      .set("Authorization", `Bearer ${tokenB}`);
    expect(listAsB.body).toHaveLength(0);

    const deleteAsB = await request(app)
      .delete(`/api/todo/${createRes.body._id}`)
      .set("Authorization", `Bearer ${tokenB}`);
    expect(deleteAsB.status).toBe(404);
  });
});

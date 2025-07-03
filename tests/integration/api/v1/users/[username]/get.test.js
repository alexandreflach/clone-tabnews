import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/v1/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With exact case match", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: "SameCase",
          email: "same.case@flach.com",
          password: "pass1234",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/SameCase",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      expect(response2.status).toBe(200);

      const responseBody = await response2.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "SameCase",
        email: "same.case@flach.com",
        password: "pass1234",
        created_at: responseBody.created_at,
        update_at: responseBody.update_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();
    });
    test("With case mismatch", async () => {
      const response1 = await fetch("http://localhost:3000/api/v1/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: "DifferentCase",
          email: "different.case@flach.com",
          password: "pass1234",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/differentcase",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      expect(response2.status).toBe(200);

      const responseBody = await response2.json();
      expect(responseBody).toEqual({
        id: responseBody.id,
        username: "DifferentCase",
        email: "different.case@flach.com",
        password: "pass1234",
        created_at: responseBody.created_at,
        update_at: responseBody.update_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.update_at)).not.toBeNaN();
    });
    test("With nonexistent username", async () => {
      const response2 = await fetch(
        "http://localhost:3000/api/v1/users/differentcase2",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      expect(response2.status).toBe(404);

      const responseBody = await response2.json();
      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "The username was not found.",
        action: "Check if the username is correctly.",
        statusCode: 404,
      });
    });
  });
});

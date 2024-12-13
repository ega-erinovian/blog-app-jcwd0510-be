import app from "../../src/app";
import { prismaMock } from "../prisma";
import request from "supertest";
import * as argonLib from "../../src/lib/argon";

const reqBody = {
  email: "mock@mail.com",
  password: "mockPassword",
};

beforeAll(() => {
  // before
  // Akan dijalankan sebelum testing pertama dijalankan
});

beforeEach(() => {
  // Akan dijalankan sebelum setiap test dijalankan
});

afterAll(() => {
  // Akan dijalankan setelah semua test dijalankan
});

afterEach(() => {
  // Akan dijalankan setelah setiap test dijalankan
});

describe("POST /auth/login", () => {
  it("should login successfully", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "mock name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(argonLib, "comparePassword").mockResolvedValue(true);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should throw an error if email not found", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid credentials");
  });

  it("should throw an error if password not match", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce({
      ...reqBody,
      id: 1,
      name: "mock name",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    jest.spyOn(argonLib, "comparePassword").mockResolvedValue(false);

    const response = await request(app).post("/auth/login").send(reqBody);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Invalid credentials");
  });
});

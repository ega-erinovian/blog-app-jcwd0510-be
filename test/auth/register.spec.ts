import app from "../../src/app";
import { prismaMock } from "../prisma";
import request from "supertest";

const reqBody = {
  name: "mock name",
  email: "mock@mail.com",
  password: "mockPassword",
};

describe("POST /auth/register", () => {
  it("should register a user", async () => {
    prismaMock.user.findFirst.mockResolvedValue(null);

    prismaMock.user.create.mockResolvedValue({
      ...reqBody,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app).post("/auth/register").send(reqBody);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
  });

  it("should throw an error if user already exists", async () => {
    prismaMock.user.findFirst.mockResolvedValue({
      ...reqBody,
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const response = await request(app).post("/auth/register").send(reqBody);

    // console.log(response.text);

    expect(response.status).toBe(400);
    expect(response.text).toBe("Email already exist");
  });

});

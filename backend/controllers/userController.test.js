import request from "supertest";
import { app } from "../index.js";
import moment from "moment";

jest.mock("../models/User.js");
import { User } from "../models/User.js";

describe("Check Updates Functions User Controller", () => {
  it("updates user expiry date if user exists", async () => {
    // const userMock = {
    //   username: "luigimatheus@hotmail.com"
    // };

    // User.findOne.mockResolvedValue(userMock);
    // console.log(User.findOne.mockResolvedValue(userMock));
    // const res = await request(app)
    //   .get("/api/currenttime");
    const requestBody = {
      username: "john_doe",
      password: "password123",
      plan: 2,
      expiresIn: 30,
    };

    const res = await request(app)
      .post("/api/auth/register") // Substitua pelo caminho da rota do seu endpoint POST
      .send(requestBody);

    await console.log(res.body);  
    await expect(res.statusCode).toEqual(200);
    
    // expect(res.body).toHaveProperty("message", "User updated");
    // expect(User.findOneAndUpdate).toHaveBeenCalledWith(
    //   { username: "luigimatheus" },
    //   { expiresAt: expect.anything() }
    // );
  });

  // it("returns 404 if user does not exist", async () => {
  //   User.findOne.mockResolvedValue(null);

  //   const res = await request(app)
  //     .put("/api/auth/update") // change this to your actual route
  //     .send({ customer: { email: "luigimatheus@hotmail.com" } });

  //   expect(res.statusCode).toEqual(404);
  //   expect(res.body).toHaveProperty("message", "User not found");
  //   expect(User.findOneAndUpdate).not.toHaveBeenCalled();
  // });

  // it("returns 500 if database error occurs", async () => {
  //   User.findOne.mockRejectedValue(new Error("Database error"));

  //   const res = await request(app)
  //     .put("/api/auth/update") // change this to your actual route
  //     .send({ customer: { email: "luigimatheus@hotmail.com" } });

  //   expect(res.statusCode).toEqual(500);
  // });
});

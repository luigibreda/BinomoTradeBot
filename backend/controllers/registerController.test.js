import request from "supertest";
import { app } from "../app.js";
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

jest.mock("../models/User.js");
jest.mock("bcrypt");
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Register Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 201 and token when registration is successful', async () => {
    const user = {
      username: 'test',
      _id: 'id',
      password: 'hashed_password',
      plan: 'premium',
      expiresAt: new Date(Date.now() + 100000000)
    };

    const requestBody = {
      username: 'test',
      password: 'password',
      plan: 'premium',
      expiresIn: 7
    };

    const hashedPassword = 'hashed_password';

    // genHashedString.mockResolvedValueOnce(hashedPassword);
    User.create.mockResolvedValueOnce(user);
    jwt.sign.mockReturnValue('token');

    const response = await request(app).post('/api/auth/register').send(requestBody);
    expect(response.status).toBe(201);
    const receivedExpiresAt = new Date(response.body.expiresAt);

    expect(response.body).toEqual({
        username: user.username,
        id: user._id,
        plan: user.plan,
        expiresAt: user.expiresAt.toISOString(),
        token: 'token',
      });
  });

  // Adicione aqui mais casos de teste como: usuário já existente, erro de validação, etc.
});

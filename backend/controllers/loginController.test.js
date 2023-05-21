import request from "supertest";
import { app } from "../app.js"; // Seu arquivo de app express
import { User } from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"; 

jest.mock("../models/User.js");
jest.mock("bcrypt");
jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
}));

describe('Login Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 200 and token when login is successful', async () => {
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
    };

    User.findOne.mockResolvedValueOnce(user);
    bcrypt.compare.mockResolvedValueOnce(true);
    jwt.sign.mockReturnValue('token');

    const response = await request(app).post('/api/auth/login').send(requestBody);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      username: user.username,
      id: user._id,
      plan: user.plan,
      token: 'token',
    });
  });

  // Adicione aqui mais casos de teste como: usuário não encontrado, senha inválida, assinatura expirada, etc.
});


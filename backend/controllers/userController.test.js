import request from "supertest";
import { app } from "../index.js";
import moment from "moment";

jest.mock("../models/User.js");
import { User } from "../models/User.js";

describe('Remove User Endpoint', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return status 200 and message "User deleted" when user exists', async () => {
    // Mock do valor retornado pela função findOneAndDelete
    User.findOneAndDelete.mockResolvedValueOnce({});

    const requestBody = {
      customer: {
        email: 'test@example.com',
      },
    };

    const response = await request(app)
      .post('/api/auth/remove')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: 'User deleted' });
    expect(User.findOneAndDelete).toHaveBeenCalledWith({ username: 'test' });
  });

  it('should return status 404 and message "User not found" when user does not exist', async () => {
    // Mock do valor retornado pela função findOneAndDelete
    User.findOneAndDelete.mockResolvedValueOnce(null);

    const requestBody = {
      customer: {
        email: 'test@example.com',
      },
    };

    const response = await request(app)
      .post('/api/auth/remove')
      .send(requestBody);

    expect(response.status).toBe(404);
    expect(response.body).toEqual({ message: 'User not found' });
    expect(User.findOneAndDelete).toHaveBeenCalledWith({ username: 'test' });
  });

  it('should return status 400 and message "Invalid body receive parameters" when request body is invalid', async () => {
    const requestBody = {};

    const response = await request(app)
      .post('/api/auth/remove')
      .send(requestBody);

    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: 'Invalid body receive parameters' });
    expect(User.findOneAndDelete).not.toHaveBeenCalled();
  });

  it('should return status 500 and error message when an error occurs', async () => {
    // Mock do lançamento de um erro pela função findOneAndDelete
    const errorMessage = 'Database error';
    User.findOneAndDelete.mockRejectedValueOnce(new Error(errorMessage));

    const requestBody = {
      customer: {
        email: 'test@example.com',
      },
    };

    const response = await request(app)
      .post('/api/auth/remove')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
    expect(User.findOneAndDelete).toHaveBeenCalledWith({ username: 'test' });
  });
});
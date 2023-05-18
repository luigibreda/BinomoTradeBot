import request from 'supertest';
import app from '../index'; // your Express app
import moment from 'moment';

jest.mock('../models/User.js');
import { User } from '../models/User.js';

describe('update', () => {
  it('updates user expiry date if user exists', async () => {
    const userMock = {
      username: 'john',
      expiresAt: moment().subtract(1, 'days')
    };

    User.findOne.mockResolvedValue(userMock);

    const res = await request(app)
      .put('/update') // change this to your actual route
      .send({ customer: { email: 'john@example.com' }});

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message', 'User updated');
    expect(User.findOneAndUpdate).toHaveBeenCalledWith(
      { username: 'john' },
      { expiresAt: expect.anything() },
      { new: true }
    );
  });

  it('returns 404 if user does not exist', async () => {
    User.findOne.mockResolvedValue(null);

    const res = await request(app)
      .put('/update') // change this to your actual route
      .send({ customer: { email: 'doesnotexist@example.com' }});

    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('message', 'User not found');
    expect(User.findOneAndUpdate).not.toHaveBeenCalled();
  });

  it('returns 500 if database error occurs', async () => {
    User.findOne.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .put('/update') // change this to your actual route
      .send({ customer: { email: 'error@example.com' }});

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('message', 'Database error');
  });
});

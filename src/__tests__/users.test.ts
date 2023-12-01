import configs from 'configs/index';
import httpStatus from 'http-status';
import request from 'supertest';
import app from '../app';

afterEach(() => jest.clearAllMocks());

describe('GET /api/v1/users', () => {
    test('should not return the all users', async () => {
        const res = await request(app).get('/api/v1/users');

        expect(res.statusCode).toBe(httpStatus.INTERNAL_SERVER_ERROR);
        expect(res.body?.success).toBe(false);
        expect(res.body?.message).toBe('You are not authorized!');
    });

    test('should return the all users', async () => {
        const res = await request(app)
            .get('/api/v1/users')
            .set('Authorization', `${configs.token}`);

        expect(res.statusCode).toBe(httpStatus.OK);
        expect(res.body?.success).toBe(true);
        expect(res.body?.data?.length).toBeGreaterThan(0);
        expect(res.body?.message).toBe('Users retrieved successfully!');
    });
});

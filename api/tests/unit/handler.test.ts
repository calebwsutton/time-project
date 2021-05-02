import { handler } from '../../app';

describe('Response code is 200', function() {
    it('verifies successful response', async () => {
        const result = await handler()

        expect(result.statusCode).toEqual(200);
    });
});

describe('Response body has currentTime property', function() {
    it('verifies successful response', async () => {
        const result = await handler()

        expect(JSON.parse(result.body)).toHaveProperty('currentTime');
    });
});

describe('currentTime porperty is in corect format', function() {
    it('verifies successful response', async () => {
        const result = await handler()

        expect(JSON.parse(result.body).currentTime).toMatch(new RegExp('^20\\d{2}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}.\\d+Z$'));
    });
});
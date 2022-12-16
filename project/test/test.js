const request = require('supertest')('http://localhost:5000');
const assert = require('chai').assert;
//const app = require("../src/index");

it('POST /api/book/create', () => {
    const data = {
        "title" : "Testt",
        "author" : "He",
        "vendorCode" : "1321",
        "year" : "10.10.2022",
        "numberOfCopies" : "100"
    };
    return request
        .post('/api/book/create')
        .send(data)
        .then((res) => {
            assert.equal(res.body.book.title, 'Testt');
            assert.equal(res.body.book.author, 'He')
        });

});


it('POST /api/reader/create', () => {
    const data = {
        "fullName" : "Ivan Ivanovs",
        "birth": "10.11.2001"
    };
    return request
        .post('/api/reader/create')
        .send(data)
        .then((res) => {
            assert.equal(res.body.reader.fullName, 'Ivan Ivanovs');
            assert.equal(res.body.reader.birth, '2001-10-11');
        });
});

it(`/GET /api/reader/getData/1`, () => {
    return request
        .get('/api/reader/getData/1')
        .expect(200)
        .then((res => {
            assert.equal(res.body.id, "1");
            }
        ))
});

it('/GET /api/book/getAvailableBooks', () => {
    return request
        .get('/api/book/getAvailableBooks')
        .expect(200)
});
const { db } = require("../db.js")
const { server } = require("../server.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

let testServer;
const endpoint = "/user"



describe(`${endpoint} Endpoint`, () => {

  beforeAll(async () => {
    testServer = server.listen(null, () => {
      global.agent = supertest.agent(testServer);
    });

  });

  it('GET /user should show all users', async () => {

    const res = await requestWithSupertest.get(endpoint);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('user')

  });

  afterAll(async () => {
    await testServer.close();
  });

});


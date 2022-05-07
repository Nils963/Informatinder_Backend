const { server } = require("../server.js");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);

const endpoint = "/user"
let testServer;
let testToken = "";
let testIndex;

describe(`${endpoint} Endpoint`, () => {

  beforeAll(async () => {
    testServer = server.listen(null, () => {
      global.agent = supertest.agent(testServer);
    });
  });

  //REGISTER USER
  it('POST /user/auth/register should register the user', async () => {
    const res = await requestWithSupertest
      .post(endpoint + "/auth/register")
      .send({ username: "JESTusername", password: "JESTpassword", confirmPassword: "JESTpassword", email: "JEST@mail.de" })

    expect(res.status).toEqual(201);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('user')
    testIndex = res.body.json().user.id;
  });

  it('POST /user/auth/register should return an error if similar username or mail', async () => {
    const res = await requestWithSupertest
      .post(endpoint + "/auth/register")
      .send({ username: "JESTusername", password: "JESTpassword", confirmPassword: "JESTpassword", email: "JEST@mail.de" })

    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('error')
  });

  it('POST /user/auth/register should return an error if no valid email', async () => {
    const res = await requestWithSupertest
      .post(endpoint + "/auth/register")
      .send({ username: "JESTusernameUnique", password: "JESTpassword", confirmPassword: "JESTpassword", email: "JESTUnnique" })

    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('error')
  });

  //LOGIN USER

  it('GET /user should show all users', async () => {
    const res = await requestWithSupertest.get(endpoint);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('user')
  });

  it('GET /user/:id should show one user', async () => {
    const res = await requestWithSupertest.get(endpoint + "/1");
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('user')
  });

  it('GET /user/:id should return error with invalid Id', async () => {
    const res = await requestWithSupertest.get(endpoint + "/-1");
    expect(res.status).toEqual(404);
  });

  it('UPDATE /user/:id should return the updated user', async () => {
    const res = await requestWithSupertest
      .patch(endpoint + "/1")
      .set("x-access-token", testToken)
      .send({ username: "test", password: "test", email: "email@mail.de" })

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('user')
  });

  it('TEST same UPDATE /user/:id should return the updated user', async () => {
    const res = await requestWithSupertest
      .patch(endpoint + "/1")
      .set("x-access-token", testToken)
      .send({ username: "test", password: "test", email: "email@mail.de" })

    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('user')
  });

  it('UPDATE /user/:id should return error with similar values', async () => {
    const res = await requestWithSupertest
      .patch(endpoint + "/2")
      .set("x-access-token", testToken)
      .send({ username: "test", password: "test", email: "email@mail.de" })

    expect(res.status).toEqual(400);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('error')
  });

  it('UPDATE /user/:id should return error with invalid Id', async () => {
    const res = await requestWithSupertest
      .patch(endpoint + "/-1")
      .set("x-access-token", testToken)
      .send({ username: "test", password: "test", email: "email@mail.de" })

    expect(res.status).toEqual(404);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('error')
  });

  afterAll(async () => {
    await testServer.close();
  });

});


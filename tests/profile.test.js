import { server } from "../server.js";
import supertest from "supertest";
import path, { dirname } from "path"
import { fileURLToPath } from 'url';
const requestWithSupertest = supertest(server);

const endpoint = "/profile"
let testServer;
let testToken = "";
let testId = -1;

beforeAll(async () => {
  testServer = server.listen(null, () => {
    global.agent = supertest.agent(testServer);
  });

  if (testToken.valueOf() === "") {
    let res = await requestWithSupertest
      .post("/user/auth/register")
      .send({ username: "JESTTestUserusername", password: "JESTpassword", confirmPassword: "JESTpassword", email: "JESTUserPROFILETest@mail.de", isBetrieb: false })

    let resObj = JSON.parse(res.text)
    testToken = resObj.token;
    testId = resObj.user.id;
  }
});

describe(`${endpoint} Endpoint`, () => {

  it('GET /profile should show all profiles', async () => {
    const res = await requestWithSupertest.get(endpoint);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('profiles');
    expect(typeof res.body.profiles).toEqual(expect.stringContaining('object'));
  });

  it('GET /profile/:id should show one profile', async () => {
    const res = await requestWithSupertest.get(endpoint + "/" + testId);
    expect(res.status).toEqual(200);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('profile');
    expect(res.body).toHaveProperty('categories');
    expect(res.body).toHaveProperty('languages');
    expect(res.body).toHaveProperty('benefits');
  });

  it('GET /profile/:id should return error with invalid Id', async () => {
    const res = await requestWithSupertest.get(endpoint + "/-1");
    expect(res.status).toEqual(404);
    expect(res.body).toHaveProperty('error');
  });

  it('UPDATE /profile/:id should return the updated user', async () => {
    const res = await requestWithSupertest
      .patch(endpoint + "/" + testId)
      .set("x-access-token", testToken)
      .send({
        name: "test",
        description: "test",
        website: "www.test.de",
        languages: "{\"Java\":6}",
        categories: "[\"test\"]",
        benefits: "[\"test\"]",
        contact: "test"
      })

    expect(res.status).toEqual(200);
  });

  it('UPDATE /profile/:id should return error not authorized', async () => {
    const res = await requestWithSupertest
      .patch(endpoint + "/-1")
      .set("x-access-token", testToken)
      .send({ name: "test", description: "test", website: "www.test.de", languages: "{\"Java\":6}", categories: ["test"], benefits: ["test"], contact: "test" })

    expect(res.status).toEqual(401);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('error')
  });

  // TEST IS NOT WORKING IN GITHUB ACTION!
  // local test is okay

  // it('UPDATE /profile/image should upload the image', async () => {
  //   const __dirname = dirname(fileURLToPath(import.meta.url));
  //   const picture = path.resolve(__dirname, './test.png');
  //   const res = await requestWithSupertest
  //     .post(endpoint + "/image")
  //     .set("x-access-token", testToken)
  //     .field('name', 'image')
  //     .attach('image', picture);

  //   expect(res.status).toEqual(200);
  //   expect(res.type).toEqual(expect.stringContaining('json'));
  //   expect(res.body).toHaveProperty('success')
  // });

  it('DELETE /user/:id should delete user', async () => {
    const res = await requestWithSupertest
      .delete(endpoint + "/" + testId)
      .set("x-access-token", testToken)
      .send()

    expect(res.status).toEqual(200);
  });

  it('DELETE /user/:id should return error with invalid Id', async () => {
    const res = await requestWithSupertest
      .delete(endpoint + "/-1")
      .set("x-access-token", testToken)
      .send()

    expect(res.status).toEqual(401);
    expect(res.type).toEqual(expect.stringContaining('json'));
    expect(res.body).toHaveProperty('error')
  });

  afterAll(async () => {
    await testServer.close();
  });

});


const { registrationController } = require("../controllers/authController");
const { connectMongo } = require("../db/connection");
const { RegistrationConflictError } = require("../helpers/errors");
require("dotenv").config();

describe("Signup controller test", () => {
  let mongo;
  beforeAll(async () => {
    mongo = await connectMongo();
  });
  it("Response should have status code 201 and user (email, subscription)", async () => {
    const mReq = {
      body: { email: "jeeeeest@email.com", password: "321j321" },
    };
    const expectedUser = { email: mReq.body.email, subscription: "starter" };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    await registrationController(mReq, mRes);
    expect(mRes.status.mock.calls[0][0]).toEqual(201);
    expect(mRes.json.mock.calls[0][0]).toEqual({
      status: "Created",
      code: 201,
      user: expectedUser,
    });
  });

  it(" It should throw new RegistrationConflictError email in use", async () => {
    const mReq = {
      body: { email: "teedhvhhhgfjddejeeest@email.com", password: "321j321" },
    };
    const mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    try {
      await registrationController(mReq, mRes);
    } catch (err) {
      expect(err).toEqual(new RegistrationConflictError("Email in use"));
    }
  });

  afterAll(async () => {
    await mongo.disconnect();
  });
});

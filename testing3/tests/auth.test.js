import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import { API } from "./libs/constants";
import { createToken } from "./libs/helpers";

const { expect } = chai;

chai.use(chaiHttp);

describe("Authentication tests", () => {
  it("should restrict access to /favourite without authorization token", async () => {
    const res = await request
      .execute(API)
      .post("/favorites")
      .send({ airport_id: "GKA" });

    expect(res).to.have.status(401);
  });

  it("should allow access to /favourite with authorization token", async () => {
    const token = createToken();

    const res = await request
      .execute(API)
      .post("/favorites")
      .set("Authorization", `Bearer ${token}`)
      .send({ airport_id: "GKA" });

    expect([201, 401]).to.include(res.status);
  });
});

import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import { API } from "./libs/constants";
import { createToken } from "./libs/helpers";

const { expect } = chai;

chai.use(chaiHttp);

describe("Validation tests", () => {
  it("should return error with invalid airport_id payload", async () => {
    const token = createToken();

    const res = await request
      .execute(API)
      .post("/favorites")
      .set("Authorization", `Bearer ${token}`)
      .send({ airport_id: 123 });

    expect([400, 422, 401]).to.include(res.status);
  });
});

import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import { API } from "./libs/constants";

const { expect } = chai;

chai.use(chaiHttp);

describe("GET /airports", () => {
  it("should return airoports with status code 200", async () => {
    const res = await request.execute(API).get("/airports");

    expect(res).to.have.status(200);
    expect(res).to.have.header("content-type");
    expect(res.body.data).to.be.an("array");
  });
});

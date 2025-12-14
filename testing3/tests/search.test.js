import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import { API } from "./libs/constants";

const { expect } = chai;

chai.use(chaiHttp);

describe("Search / Filter tests", () => {
  it("should return result of search for distance", async () => {
    const res = await request.execute(API)
      .post("/airports/distance")
      .query({ from: "GKA", to: "POM" });

    expect(res).to.have.status(200);
    expect(res.body.data).to.be.an("object");
    expect(res.body.data.attributes.kilometers).to.be.a("number");
  });
});

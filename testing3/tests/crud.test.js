import * as chai from "chai";
import { default as chaiHttp, request } from "chai-http";
import { API } from "./libs/constants";
import { createToken } from "./libs/helpers";

const { expect } = chai;

chai.use(chaiHttp);

describe("CRUD tests for /favorites", () => {
  let token;
  let favoriteId;

  beforeAll(() => {
    token = createToken();
  });

  it("should create new resource", async () => {
    const res = await request
      .execute(API)
      .post("/favorites")
      .set("Authorization", `Bearer ${token}`)
      .send({ airport_id: "GKA" });

    expect([201, 401]).to.include(res.status);

    if (res.status === 201) {
      favoriteId = res.body.data.id;
    }
  });

  it("should get all the resource", async () => {
    const res = await request
      .execute(API)
      .get("/favorites")
      .set("Authorization", `Bearer ${token}`);

    expect([200, 401]).to.include(res.status);
  });

  it("should delete specific resource", async () => {
    if (!favoriteId) return;

    const res = await request
      .execute(API)
      .delete(`/favorites/${favoriteId}`)
      .set("Authorization", `Bearer ${token}`);

    expect([204, 401]).to.include(res.status);
  });
});

import chai from "chai";
import server from "../../index";
import chaiHttp from "chai-http";
const { expect } = chai;

chai.use(chaiHttp);

function validResponse(err, res, status) {
  expect(err).to.be.null;
  expect(res).to.have.status(status);
  expect(res).to.be.json;
}

describe("get one page of recipe", function() {
  
  it("should return page with recipe", function(done) {
    chai
      .request(server)
      .get("/api/recipe/page/1")
      .end((err, res) => {
        validResponse(err, res, 200);
        console.log(res.body)
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

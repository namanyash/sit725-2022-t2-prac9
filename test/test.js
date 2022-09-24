
const expect =  require("chai").expect;
const request =  require("request")

describe("Add two number test", () => {
    url = "http://localhost:3001/addNumber/2/3"
    it("API works", (done)=>{
        request(url, function(err,res,body) {
            expect(res.statusCode).to.equal(200)
            done();
        })
    })
    it("API adds correctly", (done)=>{
        request(url, function(err,res,body) {
            expect(JSON.parse(res.body).data).to.equal(5)
            done();
        })
    })
})
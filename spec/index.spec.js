var fs = require("fs");
var waitForChange = require("..");

var FILE = "test-file"

var removeFileIfExists = () => {
  try {
    fs.accessSync(FILE);
    fs.unlinkSync(FILE);
  } catch(e) {}
}

describe("wait-for-change", () => {

  beforeEach(removeFileIfExists);
  afterAll(removeFileIfExists);

  it("should resolve when creating a new file", (done) => {
    waitForChange(FILE, 1).then(done);
    setTimeout(() => fs.writeFileSync(FILE, "foo"), 10);
  });
  afterAll(removeFileIfExists);

  it("should resolve when changing an existing file", (done) => {
    fs.writeFileSync(FILE, "foo");
    waitForChange(FILE, 1).then(done);
    setTimeout(() => fs.writeFileSync(FILE, "bar"), 10);
  });
  afterAll(removeFileIfExists);

  it("should resolve when deleting existing file and recreating it", (done) => {
    fs.writeFileSync(FILE, "foo");
    waitForChange(FILE, 1).then(done);
    setTimeout(() => fs.unlinkSync(FILE), 10);
    setTimeout(() => fs.writeFileSync(FILE, "bar"), 20);
  });

})

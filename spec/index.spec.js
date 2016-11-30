"use strict";
var fs = require("fs");
var waitForChange = require("..");

var FILE = "test-file";
var FILES = [FILE, "test-file2"];

var removeFileIfExists = () => {
  FILES.forEach(file => {
    try {
      fs.accessSync(file);
      fs.unlinkSync(file);
    } catch(e) {}
  });
};

describe("wait-for-change", () => {

  beforeEach(removeFileIfExists);
  afterAll(removeFileIfExists);

  describe("single file", () => {

    it("should resolve when creating a new file", (done) => {
      waitForChange(FILE, 1).then(done);
      setTimeout(() => fs.writeFileSync(FILE, "foo"), 10);
    });

    it("should resolve when changing an existing file", (done) => {
      fs.writeFileSync(FILE, "foo");
      waitForChange(FILE, 1).then(done);
      setTimeout(() => fs.writeFileSync(FILE, "bar"), 10);
    });

    it("should resolve when deleting existing file and recreating it", (done) => {
      fs.writeFileSync(FILE, "foo");
      waitForChange(FILE, 1).then(done);
      setTimeout(() => fs.unlinkSync(FILE), 10);
      setTimeout(() => fs.writeFileSync(FILE, "bar"), 20);
    });

  });

  describe("multiple files", () => {

    it("should not resolve when not all files are written", (done) => {
      let resolved = false;
      waitForChange(FILES, 1).then(() => resolved = true);
      setTimeout(() => fs.writeFileSync(FILES[0], "foo"), 10);
      setTimeout(() => {
        expect(resolved).toBe(false);
        done();
      }, 20);
    });

    it("should resolve when all files are written", (done) => {
      waitForChange(FILES, 1).then(done);
      setTimeout(() => fs.writeFileSync(FILES[0], "foo"), 10);
      setTimeout(() => fs.writeFileSync(FILES[1], "foo"), 10);
    });

  })

});

const Engineer = require("../lib/Engineer");

test("Can set GitHUb account via constructor", () => {
  const github = "github";
  const e = new Engineer("Eric",23,"eric@test.com",github);
  expect(e.github).toBe(github);

});

test("getRole() should return \"Engineer\"", () => {
   const testValue = "Engineer";
  const e = new Engineer("Eric", 23,"eric@test.com", "github");
  expect(e.getRole()).toBe(testValue);
});

test("Can get GitHub username via getGithub()", () => {
  const testValue = "github";
  const e = new Engineer("Eric",23,"eric@test.com",testValue);
  expect(e.getGithub()).toBe(testValue);
});













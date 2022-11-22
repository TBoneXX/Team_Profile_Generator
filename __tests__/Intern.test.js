const Intern = require("../lib/Intern");

test("Can set School via constructor", () => {

  const school = "school";
  const e = new Intern("John", 13, "john@test.com", school);
  expect(e.school).toBe(school);
});

test("getRole() should return \"Intern\"", () => {
 
  const testValue = "Intern";
  const e = new Intern("John", 13, "john@test.com", "school");
  expect(e.getRole()).toBe(testValue);
});

test("Can get school via getSchool()", () => {
  
  const testValue = "school";
  const e = new Intern("John", 13, "john@test.com", testValue);
  expect(e.getSchool()).toBe(testValue);
});
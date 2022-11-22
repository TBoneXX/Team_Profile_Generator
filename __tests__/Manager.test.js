const Manager = require("../lib/Manager");

test("Can set office via constructor", () => {
  
  const testValue = 203;
  const e = new Manager("Tim", 11, "tim@test.com", testValue);
  expect(e.office).toBe(testValue);
});

test("getRole() should return \"Manager\"", () => {
 
  const testValue = "Manager";
  const e = new Manager("Tim", 11, "tim@test.com", 203);
  expect(e.getRole()).toBe(testValue);
});

test("Can get office via getOffice()", () => {
  
  const testValue = "office";
  const e = new Manager("Tim", 11, "tim@test.com", testValue);
  expect(e.getOffice()).toBe(testValue);
});
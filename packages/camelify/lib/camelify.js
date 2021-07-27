"use strict";

const _ = require("lodash");
const { camelCase } = require("@zgriesinger/utils");

module.exports = camelify;

function camelify(camelString) {
  console.log("============ Welcome to Camelify ============");
  console.log("This is a Single Humped Camel 🐪");
  console.log(
    "This is camelCase Single Humped Camel",
    camelCase("SingleHumpedCamel")
  );
  console.log("This is a Double Humped Camel 🐫");
  console.log(
    "This is camelCase Double Humped Camel",
    _.camelCase("DoubleHumpedCamel")
  );
  return `🐪 ${camelCase(camelString)} 🐫`;
}

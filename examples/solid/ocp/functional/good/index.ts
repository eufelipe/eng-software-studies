import {
    csvProcessor,
    jsonProcessor,
    processData,
    xmlProcessor,
} from "./processData";

const data = [
  ["name", "age"],
  ["João das Couves", "30"],
  ["Fulano de Tal", "40"],
  ["Ciclano Beltrano", "25"],
];

console.log(processData(data, jsonProcessor)); // JSON
console.log(processData(data, csvProcessor)); // CSV
console.log(processData(data, xmlProcessor)); // XML

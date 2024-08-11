import { processData } from "./processData";

function main() {
  const data = [
    ["name", "age"],
    ["João das Couves", "30"],
    ["Fulano de Tal", "40"],
    ["Ciclano Beltrano", "25"],
  ];

  console.log(processData(data, "json")); 
  console.log(processData(data, "csv"));
  console.log(processData(data, "xml"));
}

main();

import { CSVTOJson } from "./CSVToJson"

CSVTOJson.convert({
  csvPath: process.env.GEO_CSV_PATH || "./src/lib/data/geo.csv",
  jsonPath: process.env.GEO_JSON_PATH || "./src/lib/data/geo.json",
  delimiter: ",",
  ignoreColumns: /iso2|capital|population|population_proper/,
  writeToFile: true,
})

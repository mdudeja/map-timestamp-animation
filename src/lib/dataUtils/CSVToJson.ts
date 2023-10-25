import fs from "fs"
import c2j from "csvtojson"

export class CSVTOJson {
  static async convert(data: {
    csvPath: string
    jsonPath: string
    delimiter?: string
    ignoreColumns?: RegExp
    writeToFile?: boolean
  }) {
    const { csvPath, jsonPath, ignoreColumns, delimiter = "," } = data
    const csv = fs.readFileSync(csvPath, "utf8")
    const json = await c2j({ delimiter, ignoreColumns }).fromString(csv)

    if (data.writeToFile) {
      fs.writeFileSync(jsonPath, JSON.stringify(json, null, 2))
    }

    return json
  }
}

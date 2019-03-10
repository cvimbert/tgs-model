import { ParsingResult } from "tgs-parser";

export class ScriptModel {

  static loadScripts(results: ParsingResult[]): {[key: string]: ScriptModel} {
    let dic: {[key: string]: ScriptModel} = {};

    results.forEach(res => {
      dic[res.getValue("scriptOpener@scriptId")[0]] = new ScriptModel();
    });

    return dic;
  }
}

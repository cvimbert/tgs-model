import { ParsingResult } from "tgs-parser";
import { ScriptInstructionModel } from "./script-instruction-model.class";

export class ScriptModel {

  instructions: ScriptInstructionModel[];

  static loadScripts(results: ParsingResult[]): {[key: string]: ScriptModel} {
    let dic: {[key: string]: ScriptModel} = {};

    results.forEach(res => {
      dic[res.getFirstValue("scriptOpener@scriptId")] = this.loadScript(res);
    });

    return dic;
  }

  static loadScript(result: ParsingResult): ScriptModel {
    let model = new ScriptModel();
    model.instructions = ScriptInstructionModel.loadInstructions(result.getResults("commandsGroup/instructions"));
    //console.log(model);
    return model;
  }
}

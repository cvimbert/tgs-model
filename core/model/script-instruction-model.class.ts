import { ParsingResult } from "tgs-parser";

export class ScriptInstructionModel {

  static loadInstruction(result: ParsingResult): ScriptInstructionModel {
    let model = new ScriptInstructionModel();

    return model;
  }

  static loadInstructions(results: ParsingResult[]): ScriptInstructionModel[] {
    return results.map(res => this.loadInstruction(res));
  }
}

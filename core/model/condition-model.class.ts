import { ParsingResult } from "tgs-parser";

export class ConditionModel {

  static loadCondition(result: ParsingResult) {
    let model: ConditionModel = new ConditionModel();
    return model;
  }

  evaluate(): boolean {
    return true;
  }
}

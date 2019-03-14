import { ParsingResult } from "tgs-parser";
import { BooleanValueModel } from "./boolean-value-model.class";

export class ConditionModel {

  conditionName: string;
  booleanValue: BooleanValueModel;

  static loadCondition(result: ParsingResult) {
    let model: ConditionModel = new ConditionModel();

    //console.log("condition result", result);
    let booleanResult: ParsingResult[] = result.getResults("booleanValue");

    if (booleanResult) {
      model.booleanValue = BooleanValueModel.loadBooleanValue(booleanResult[0]);
    }

    return model;
  }
}

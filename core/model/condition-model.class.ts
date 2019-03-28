import { ParsingResult } from "tgs-parser";
import { BooleanValueModel } from "./boolean-value-model.class";

export class ConditionModel {

  conditionName: string;
  booleanValue: BooleanValueModel;

  static loadCondition(result: ParsingResult): ConditionModel {
    let model: ConditionModel = new ConditionModel();

    //console.log("condition result", result);
    let booleanResult: ParsingResult[] = result.getResults("booleanValue");

    if (booleanResult) {
      model.booleanValue = BooleanValueModel.loadBooleanValue(booleanResult[0]);
    }

    return model;
  }

  static loadConditionsDeclarations(results: ParsingResult[]): {[key: string]: ConditionModel} {
    
    let conditions: {[key: string]: ConditionModel} = {};

    results.forEach(res => {
      conditions[res.getFirstValue("conditionName@name")] = this.loadCondition(res.getFirstResult("condition"));
    });

    //console.log(results, conditions);

    return conditions;
  }
}

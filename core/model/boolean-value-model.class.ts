import { ParsingResult } from "tgs-parser";
import { BooleanComparisonModel } from "./boolean-comparison-model.class";

export class BooleanValueModel {

  comparison: BooleanComparisonModel;

  static loadBooleanValue(result: ParsingResult): BooleanValueModel {

    let model = new BooleanValueModel();

    let comparisonResults: ParsingResult[] = result.getResults("comparison");

    if (comparisonResults) {
      model.comparison = BooleanComparisonModel.loadComparison(comparisonResults[0]);
    }

    //console.log(result);

    return model;
  }
}

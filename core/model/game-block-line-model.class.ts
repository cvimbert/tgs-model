import { ParsingResult } from "tgs-parser";
import { ConditionModel } from "./condition-model.class";
import { BlockLineType } from "./enums/block-line-types.enum";

export class GameBlockLineModel {

  type: BlockLineType;
  condition: ConditionModel;
  lines: GameBlockLineModel[];
  text: string;
  formats: string[] = [];

  static loadLine(result: ParsingResult): GameBlockLineModel {
    let line: GameBlockLineModel = new GameBlockLineModel();

    let subResults: ParsingResult[] = result.getResults("simpleLine");

    //console.log(result);

    if (subResults) {
      line.type = BlockLineType.SIMPLE;
      line.text = subResults[0].getFirstValue("blockline@text");
      return line;
    }

    subResults = result.getResults("conditionalBlock");

    if (subResults) {
      line.type = BlockLineType.COMPLEX;

      let conditionResult: ParsingResult = subResults[0].getFirstResult("condition/conditionBody");

      if (conditionResult) {
        line.condition = ConditionModel.loadCondition(conditionResult);
      }

      line.lines = GameBlockLineModel.loadLines(subResults[0].getResults("blocks"));

      line.formats = subResults[0].getValue("format/formatsList@name");

      //console.log(line.formats);
      return line;
    }
  }

  static loadLines(results: ParsingResult[]): GameBlockLineModel[] {
    let lines: GameBlockLineModel[] = [];
    results.forEach(res => lines.push(GameBlockLineModel.loadLine(res)));
    return lines;
  }
}

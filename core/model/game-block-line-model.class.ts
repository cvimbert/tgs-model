import { ParsingResult } from "tgs-parser";
import { ConditionModel } from "./condition-model.class";
import { BlockLineType } from "./enums/block-line-types.enum";

export class GameBlockLineModel {

  type: BlockLineType;
  condition: ConditionModel;
  lines: GameBlockLineModel[];
  text: string;
  format: string;

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
      line.condition = ConditionModel.loadCondition(subResults[0].getFirstResult("condition"));
      line.lines = GameBlockLineModel.loadLines(subResults[0].getResults("blocks"));
      return line;
    }

    subResults = result.getResults("formatOpener");

    if (subResults) {
      line.type = BlockLineType.FORMAT_OPENER;
      line.format = subResults[0].groups["name"]
      //console.log("format opener", subResults, line);
      return line;
    }

    subResults = result.getResults("formatCloser");

    if (subResults) {
      line.type = BlockLineType.FORMAT_CLOSER;
      line.format = subResults[0].groups["name"]
      //console.log("format closer", subResults);
      return line;
    }
  }

  static loadLines(results: ParsingResult[]): GameBlockLineModel[] {
    let lines: GameBlockLineModel[] = [];
    results.forEach(res => lines.push(GameBlockLineModel.loadLine(res)));
    return lines;
  }
}

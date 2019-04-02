import { ParsingResult } from "tgs-parser";
import { ConditionModel } from "./condition-model.class";
import { BlockLineType } from "./enums/block-line-types.enum";
import { TagModel } from "./tag-model.class";

export class GameBlockLineModel {

  type: BlockLineType;
  condition: ConditionModel;
  lines: GameBlockLineModel[];
  text: string;
  formats: string[] = [];
  tag: TagModel;

  static loadLine(result: ParsingResult): GameBlockLineModel {
    let line: GameBlockLineModel = new GameBlockLineModel();

    let subResults: ParsingResult[] = result.getResults("simpleLine");

    //console.log(result);

    if (subResults) {

      //console.log(subResults[0].getFirstKey());

      switch (subResults[0].getFirstKey()) {
        case "blockline":
          line.type = BlockLineType.SIMPLE;
          line.text = subResults[0].getFirstValue("blockline/blockline@text");
          break;

        case "simpleBreak":
          line.type = BlockLineType.LINE_BREAK;
          break;

        case "doubleBreak":
          line.type = BlockLineType.PARAGRAPH_SEPARATOR;
          break;
      }

      line.formats = subResults[0].getValue("format/formatsList@name");
      console.log(line.formats);

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

    subResults = result.getResults("tag");

    if (subResults) {
      line.type = BlockLineType.TAG;
      line.tag = TagModel.loadTag(subResults[0]);

      return line;
    }
  }

  static loadLines(results: ParsingResult[]): GameBlockLineModel[] {
    let lines: GameBlockLineModel[] = results ? results.map(res => GameBlockLineModel.loadLine(res)) : [];

    // suppression des premiers vides, et des derniers
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].type == BlockLineType.PARAGRAPH_SEPARATOR) {
        lines.splice(i, 1);
        i--;
      } else {
        break;
      }
    }

    for (let i = lines.length - 1; i >= 0; i--) {
      if (lines[i].type == BlockLineType.PARAGRAPH_SEPARATOR) {
        lines.splice(i, 1);
      } else {
        break;
      }
    }

    return lines;
  }
}

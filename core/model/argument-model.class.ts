import { ArgumentType } from "../enums/argument-type.enum";
import { ParsingResult } from "tgs-parser";

export class ArgumentModel {

  type: ArgumentType;
  value: any;
  variableName: string;

  static loadArgument(result: ParsingResult): ArgumentModel {
    let model = new ArgumentModel();

    switch(result.getFirstKey()) {
      case "string":
        model.type = ArgumentType.STRING;
        model.value = result.getFirstValue("string/value@value");
        break;
      case "number":
        model.type = ArgumentType.NUMBER;
        model.value = +result.getFirstValue("number/value@value");
        break;
      case "boolean":
        model.type = ArgumentType.BOOLEAN;
        model.value = result.getFirstValue("boolean/value@value") === "true";
        break;
      case "variable":
        model.type = ArgumentType.VARIABLE;
        model.variableName = result.getFirstValue("variable/variableName@name");
        break;
    }

    return model;
  }

  static loadArguments(results: ParsingResult[]): ArgumentModel[] {
    if (results) {
      return results.map(res => this.loadArgument(res));
    }
  }
}

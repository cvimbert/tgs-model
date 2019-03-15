import { ParsingResult } from "tgs-parser";
import { ScriptInstructionType } from "../enums/script-instruction-type.enum";
import { ConditionModel } from "./condition-model.class";
import { ArgumentModel } from "./argument-model.class";

export class ScriptInstructionModel {

  type: ScriptInstructionType;

  // cas de command
  commandName: string;
  commandArguments: ArgumentModel[];

  // cas if (ou potentiellement for)
  condition: ConditionModel;
  instructions: ScriptInstructionModel[];

  static loadInstruction(result: ParsingResult): ScriptInstructionModel {
    let model = new ScriptInstructionModel();

    //console.log(result);

    let commandRes: ParsingResult = result.getFirstResult("commandWithArgs");

    if (commandRes) {
      model.type = ScriptInstructionType.COMMAND;
      model.commandName = commandRes.getFirstValue("command@name");
      model.commandArguments = ArgumentModel.loadArguments(commandRes.getResults("arguments"));
    }

    let ifRes: ParsingResult = result.getFirstResult("if");

    if (ifRes) {
      model.type = ScriptInstructionType.IF;
      model.condition = ConditionModel.loadCondition(ifRes.getFirstResult("condition"));
      model.instructions = this.loadInstructions(ifRes.getResults("commandsGroup/instructions"));
    }

    console.log("instruction", result, model);

    return model;
  }

  static loadInstructions(results: ParsingResult[]): ScriptInstructionModel[] {
    //console.log("instructions", results);
    return results.map(res => this.loadInstruction(res));
  }
}

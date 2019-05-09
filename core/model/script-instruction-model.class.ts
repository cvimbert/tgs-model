import { ParsingResult } from "tgs-parser";
import { ScriptInstructionType } from "../enums/script-instruction-type.enum";
import { ConditionModel } from "./condition-model.class";
import { ArgumentModel } from "./argument-model.class";
import { ComparisonOperandModel } from './comparison-operand-model.class';
import { ComplexConditionModel } from "./complex-condition-model.class";

export class ScriptInstructionModel {

  type: ScriptInstructionType;

  // cas de command
  commandName: string;
  commandArguments: ArgumentModel[];

  // cas if (ou potentiellement for)
  condition: ComplexConditionModel;
  instructions: ScriptInstructionModel[];

  // cas d'une assignation
  variableName: string;
  assignationOperator: string;
  value: ArgumentModel;

  static loadInstruction(result: ParsingResult): ScriptInstructionModel {
    let model = new ScriptInstructionModel();

    //console.log(result);

    let commandRes: ParsingResult = result.getFirstResult("commandWithArgs");

    if (commandRes) {
      model.type = ScriptInstructionType.COMMAND;
      model.commandName = commandRes.getFirstValue("command@name");
      model.commandArguments = ArgumentModel.loadArguments(commandRes.getResults("arguments"));
    }

    let functionRes: ParsingResult = result.getFirstResult("function/functionBody");

    if (functionRes) {
      model.type = ScriptInstructionType.COMMAND;
      model.commandName = functionRes.getFirstValue("functionName@name");
      model.commandArguments = ArgumentModel.loadArguments(functionRes.getResults("arguments/argument"));
    }

    let ifRes: ParsingResult = result.getFirstResult("if");

    if (ifRes) {
      model.type = ScriptInstructionType.IF;
      model.condition = ComplexConditionModel.loadCondition(ifRes.getFirstResult("condition"));
      model.instructions = this.loadInstructions(ifRes.getResults("commandsGroup/instructions"));
    }

    let assignationRes: ParsingResult = result.getFirstResult("assignation");

    if (assignationRes) {
      model.type = ScriptInstructionType.ASSIGNATION;
      model.variableName = assignationRes.getFirstValue("variable/variableName@name");
      model.assignationOperator = assignationRes.getFirstResult("operator").getFirstKey();

      let valueResult: ParsingResult = assignationRes.getFirstResult("value");

      if (valueResult) {
        model.value = ArgumentModel.loadArgument(valueResult);
      }

      //console.log("assignation", assignationRes, model);
    }

    //console.log("instruction", result, model);

    return model;
  }

  static loadInstructions(results: ParsingResult[]): ScriptInstructionModel[] {
    //console.log("instructions", results);
    return results.map(res => this.loadInstruction(res));
  }
}

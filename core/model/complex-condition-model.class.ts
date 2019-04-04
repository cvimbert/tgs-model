import { ParsingResult } from "tgs-parser";
import { ConditionModel } from "./condition-model.class";

export class ComplexConditionModel {

    operand1: ConditionModel;
    operand2: ComplexConditionModel;
    operator: string;

    simpleCondition: ConditionModel;

    static loadCondition(result: ParsingResult): ComplexConditionModel {

        let model = new ComplexConditionModel();

        let type: string = result.getFirstKey();

        switch (type) {
            case "expression":
                this.loadOperands(model, result.getFirstResult("expression"));
                break;

            case "expressionInParenthesis":
                this.loadOperands(model, result.getFirstResult("expressionInParenthesis/expression"));
                break;

            case "conditionGroup":
                model.simpleCondition = ConditionModel.loadCondition(result);
                //console.log(model);
                break;
        }

        return model;
    }

    static loadOperands(model: ComplexConditionModel, result: ParsingResult) {
        model.operand1 = ConditionModel.loadCondition(result.getFirstResult("operand1"));
        model.operand2 = this.loadCondition(result.getFirstResult("operand2"));
        model.operator = result.getFirstResult("operator").getFirstKey();
    }
}
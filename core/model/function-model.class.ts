import { ArgumentModel } from "../model/argument-model.class";
import { ParsingResult } from "tgs-parser";

export class FunctionModel {

    name: string;
    args: ArgumentModel[] = [];

    static loadFunction(result: ParsingResult): FunctionModel {
        let model = new FunctionModel();

        model.name = result.getFirstValue("functionName@name");
        model.args = ArgumentModel.loadArguments(result.getResults("arguments/argument"));

        // console.log(model);

        return model;
    }
}
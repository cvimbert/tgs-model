import { ParsingResult } from "tgs-parser";
import { ConditionModel } from "./condition-model.class";
import { LinkDirectiveModel } from "./link-directive-model.class";
import { ComplexConditionModel } from "./complex-condition-model.class";

export class LinkModel {

  text: string;
  localLinkRef: string;
  globalLinkRef: string;
  //condition: ConditionModel;
  complexCondition: ComplexConditionModel;
  directives: LinkDirectiveModel[];

  static loadLink(result: ParsingResult): LinkModel {

    //console.log("link", result);

    let model: LinkModel = new LinkModel();

    model.text = result.getFirstValue("simpleLinkText@text");
    
    model.localLinkRef = result.getFirstValue("link/localRef/blockId@id");
    model.globalLinkRef = result.getFirstValue("link/globalRef@ref");

    let conditionResult: ParsingResult = result.getFirstResult("condition");

    if (conditionResult) {
      //console.log("ccc", conditionResult);
      let subRes: ParsingResult = conditionResult.getFirstResult("conditionBody");
      //console.log("sub", subRes);
      //model.condition = ConditionModel.loadCondition(subRes);

      model.complexCondition = ComplexConditionModel.loadCondition(subRes);
      //console.log("ici", model);
    }

    model.directives = LinkDirectiveModel.loadDirectives(result.getResults("linkDirectives/directives"));

    return model;
  }

  static loadLinks(results: ParsingResult[]): LinkModel[] {
    return results ? results.map(res => this.loadLink(res)) : null;
  }

  static loadRedirection(result: ParsingResult): LinkModel {

    let model = new LinkModel();

    model.localLinkRef = result.getFirstValue("link/blockId@id");

    let conditionRes: ParsingResult = result.getFirstResult("condition/conditionBody");
    model.complexCondition = conditionRes ? ComplexConditionModel.loadCondition(conditionRes) : null;

    //console.log(result, model);

    return model;
  }

  static loadRedirections(results: ParsingResult[]): LinkModel[] {
    return results ? results.map(res => this.loadRedirection(res)) : null;
  }
}

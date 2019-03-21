import { ParsingResult } from "tgs-parser";

export class TagModel {

    name: string;
    attributes: {[key: string]: string} = {};

    static loadTag(result: ParsingResult): TagModel {

        let model = new TagModel();

        model.name = result.getFirstValue("tagName@name");

        let attributesModels: ParsingResult[] = result.getResults("attributes");

        if (attributesModels) {
            attributesModels.forEach(attrModel => {
                model.attributes[attrModel.getFirstValue("attribute@attributeName")] = attrModel.getFirstValue("attribute@attributeValue");
            });
        }

        //console.log("tag", result, model);
        return model;
    }
}
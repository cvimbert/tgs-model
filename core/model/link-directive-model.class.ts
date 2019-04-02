import { ParsingResult } from "tgs-parser";

export class LinkDirectiveModel {

    id: string;

    static loadDirective(result: ParsingResult): LinkDirectiveModel {
        let model = new LinkDirectiveModel();

        // le cas "basic" est le seul traité ici
        model.id = result.getFirstValue("directive/basic@name");
        
        //console.log(result, model);
        return model;
    }

    static loadDirectives(results: ParsingResult[]): LinkDirectiveModel[] {
        return results ? results.map(res => this.loadDirective(res)) : [];
    }
}
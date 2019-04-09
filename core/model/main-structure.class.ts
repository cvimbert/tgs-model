import { ParsingResult } from "tgs-parser";
import { ScriptModel } from "./script-model.class";
import { GameBlockModel } from "./game-block-model.class";
import { ConditionModel } from "./condition-model.class";

export class MainStructure {

  scripts: {[key: string]: ScriptModel};
  conditions: {[key: string]: ConditionModel};
  blocks: {[key: string]: GameBlockModel};
  blocksArray: GameBlockModel[] = [];

  // peut-être pas nécessaire si on emploie un nom spécifique pour le bloc d'entrée
  entryBlockId: string;

  static getNestedBlockId(parentId: string, nestedId: string): string {
    return parentId + "$" + nestedId;
  }

  static loadFromParsingResult(result: ParsingResult): MainStructure {

    let conditionsResults: ParsingResult[] = result.getResults("conditions") || [];
    let scriptResults: ParsingResult[] = result.getResults("scripts") || [];
    let blocksResults: ParsingResult[] = result.getResults("gameBlocks");

    let structure = new MainStructure();
    
    structure.conditions = ConditionModel.loadConditionsDeclarations(conditionsResults);
    structure.scripts = ScriptModel.loadScripts(scriptResults);
    structure.blocks = GameBlockModel.loadBlocks(blocksResults);
    structure.entryBlockId = GameBlockModel.getBlockId(blocksResults[0]);

    for (let key in structure.blocks) {
      structure.blocksArray.push(structure.blocks[key]);
    }

    structure.blocksArray.forEach(block => {
      if (block.links) {
        block.links.forEach(link => {
          if (link.nestedBlock) {
            let newId = this.getNestedBlockId(block.id, link.nestedBlock.id);
            structure.blocks[newId] = link.nestedBlock;
            structure.blocksArray.push(link.nestedBlock);
          }
        });
      }
    });

    //console.log(structure);
    return structure;
  }
}

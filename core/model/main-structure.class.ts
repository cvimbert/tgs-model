import { ParsingResult } from "tgs-parser";
import { ScriptModel } from "./script-model.class";
import { GameBlockModel } from "./game-block-model.class";

export class MainStructure {

  scripts: {[key: string]: ScriptModel} = {};
  blocks: {[key: string]: GameBlockModel} = {};

  // peut-être pas nécessaire si on emploie un nom spécifique pour le bloc de départ
  entryBlockId: string;

  static loadFromParsingResult(result: ParsingResult): MainStructure {

    let scriptResults: ParsingResult[] = result.getResults("scripts");
    let blocksResults: ParsingResult[] = result.getResults("gameBlocks");

    let structure = new MainStructure();
    structure.scripts = ScriptModel.loadScripts(scriptResults);
    structure.blocks = GameBlockModel.loadBlocks(blocksResults);
    structure.entryBlockId = GameBlockModel.getBlockId(blocksResults[0]);

    return structure;
  }
}

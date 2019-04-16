import { ParsingResult } from "tgs-parser";
import { GameBlockLineModel } from "./game-block-line-model.class";
import { LinkModel } from "./link-model.class";
import { ScriptModel } from "./script-model.class";

export class GameBlockModel {

  id: string;
  scripts: {[key: string]: ScriptModel };
  lines: GameBlockLineModel[] = [];
  links: LinkModel[] = [];
  redirections: LinkModel[];

  startIndex: number;
  endIndex: number;

  static loadBlocks(results: ParsingResult[]): {[key: string]: GameBlockModel} {
    let dic: {[key: string]: GameBlockModel} = {};

    results.forEach(res => {
      let id: string = res.getFirstValue("blockId/blockId@id");
      dic[id] = GameBlockModel.loadBlock(res, id);
    });

    return dic;
  }

  static loadBlock(result: ParsingResult, id: string): GameBlockModel {
    let block: GameBlockModel = new GameBlockModel();

    block.id = id;
    block.lines = GameBlockLineModel.loadLines(result.getResults("blockLines"));
    block.links = LinkModel.loadLinks(result.getResults("blockLinks"), id);
    block.redirections = LinkModel.loadRedirections(result.getResults("directLink"));

    block.startIndex = result.startIndex;
    block.endIndex = result.endIndex;

    //console.log(result, block.redirections);

    let scripts: ParsingResult[] = result.getResults("scripts");

    if (scripts) {
      block.scripts = ScriptModel.loadScripts(result.getResults("scripts"));
    }

    //console.log("block", result, block);

    return block;
  }

  // utile ?
  static getBlockId(result: ParsingResult): string {
    return result.getFirstValue("blockId/blockId@id");
  }
}

import { ParsingResult } from "tgs-parser";
import { GameBlockLineModel } from "./game-block-line-model.class";
import { LinkModel } from "./link-model.class";

export class GameBlockModel {

  id: string;
  lines: GameBlockLineModel[] = [];
  links: LinkModel[] = [];

  static loadBlocks(results: ParsingResult[]): {[key: string]: GameBlockModel} {
    let dic: {[key: string]: GameBlockModel} = {};

    results.forEach(res => {
      let id: string = res.getValue("blockId/blockId@id")[0];
      dic[id] = GameBlockModel.loadBlock(res, id);
    });

    return dic;
  }

  static loadBlock(result: ParsingResult, id: string): GameBlockModel {
    let block: GameBlockModel = new GameBlockModel();
    block.lines = GameBlockLineModel.loadLines(result.getResults("blockLines"));
    block.id = id;
    //console.log("block", result); 
    block.links = LinkModel.loadLinks(result.getResults("blockLinks"));

    return block;
  }

  // utile ?
  static getBlockId(result: ParsingResult): string {
    return result.getValue("blockId/blockId@id")[0];
  }
}

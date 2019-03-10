import { ParsingResult } from "tgs-parser";

export class GameBlockModel {

  static loadBlocks(results: ParsingResult[]): {[key: string]: GameBlockModel} {
    let dic: {[key: string]: GameBlockModel} = {};

    results.forEach(res => {
      dic[res.getValue("blockId/blockId@id")[0]] = new GameBlockModel();
    });

    return dic;
  }

  static getBlockId(result: ParsingResult): string {
    return result.getValue("blockId/blockId@id")[0];
  }
}

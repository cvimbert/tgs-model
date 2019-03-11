import { ParsingResult } from "tgs-parser";

export class LinkModel {

  text: string;
  localLinkRef: string;
  globalLinkRef: string;

  static loadLink(result: ParsingResult): LinkModel {
    let model: LinkModel = new LinkModel();

    model.text = result.getValue("simpleLinkText@text")[0];
    model.localLinkRef = result.getValue("link/localRef/blockId@id")[0];

    let globalRef: string = result.getValue("link/globalRef@ref")[0];

    if (globalRef) {
      model.globalLinkRef = globalRef;
    }

    return model;
  }

  static loadLinks(results: ParsingResult[]): LinkModel[] {
    if (results) {
      let links: LinkModel[] = [];
      results.forEach(res => links.push(LinkModel.loadLink(res)));
      return links;
    }
  }
}

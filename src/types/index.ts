import { LinkIconId, LinkTitle } from "../enums";

export interface ProjectData {
  title: string,
  description: string,
  image: string,
  svgTitle: Array<string>,
  links?: Array<LinkData>
}

export class LinkData {
  value: string;
  title: LinkTitle;
  iconId: LinkIconId | undefined;
  constructor(value: string, title: LinkTitle, iconId?: LinkIconId) {
    this.value = value;
    this.title = title;
    this.iconId = iconId;
  }
}
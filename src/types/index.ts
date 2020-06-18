import { LinkIconId } from "../enums";

export interface ProjectData {
  id?: number,
  title: string,
  description: string,
  links?: Array<LinkData>
}

interface LinkData {
  type: string,
  value: string,
  title: string,
  iconId: LinkIconId
}
import type {FriendLink} from "~/types/friendLink";

export interface FriendLinkGroup {
  group: string,
  desc?: string,
  links: FriendLink[]
}

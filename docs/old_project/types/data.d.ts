import type {Mood} from "~/types/mood";
import type {FriendLinkGroup} from "~/types/friendLinkGroup";

export interface Data {
  mood: Mood[],
  friends: FriendLinkGroup[]
}

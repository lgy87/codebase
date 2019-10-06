import getNormalizedImage from "~/utils/getNormalizedImage"
import { AVATAR_SIZE } from "./config"

export default function getAvatar(src) {
  return getNormalizedImage(AVATAR_SIZE, src)
}

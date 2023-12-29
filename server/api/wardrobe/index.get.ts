import type { Article } from '~/generated/types'

export default defineEventHandler((): { wardrobe: Article[] } => {
  return { wardrobe: [] }
})

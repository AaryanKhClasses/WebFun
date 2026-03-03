import type { NewsItem, WorldState } from './types'

export default function addNews(world: WorldState, title: string, category: NewsItem['category'] = 'general') {
    const item: NewsItem = {
        id: crypto.randomUUID(),
        title,
        category,
        timestamp: Date.now()
    }

    world.news.unshift(item)
    if(world.news.length > 6) world.news = world.news.slice(0, 6)
}

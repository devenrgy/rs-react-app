export const hasItems = <T>(items: T[] | null | undefined): items is T[] => !!items && items.length > 0

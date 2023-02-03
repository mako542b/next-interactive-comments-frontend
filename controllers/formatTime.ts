export function formatTime(date: string) {
    const parts = date.split('T')
    if(parts.length < 2) return date
    let day = (parts[0]).replace(/-/g,'.')
    let time = parts[1].slice(0,8)
    if(new Date(date).getTime() > new Date().getTime() - 100000) return 'just now'
    if(new Date(date).getTime() > new Date().getTime() - 1000 * 60 * 60) return 'last hour'
    return day + ', ' + time
}

export function sortByTimestamp(a: string, b: string) {
    const timestampA = new Date(a).getTime()
    const timestampB = new Date(b).getTime()
    return timestampB - timestampA
}
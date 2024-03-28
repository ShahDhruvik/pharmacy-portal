import { format, parseISO } from 'date-fns'
import { enGB } from 'date-fns/locale'

export const formatCreatedAt = (createdAt: string) => {
    const createdDate = new Date(createdAt)
    const formattedTime = createdDate.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    })
    return formattedTime
}
export const getLastSeenTime = (createdAt: any) => {
    const now = new Date() as any
    const timeDifference = (now - createdAt) / 1000 // Convert milliseconds to seconds
    if (createdAt.toDateString() === now.toDateString()) {
        return createdAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    } else if (createdAt.toDateString() === new Date(now - 24 * 60 * 60 * 1000).toDateString()) {
        return 'Yesterday'
    } else {
        return createdAt.toLocaleDateString([], {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        })
    }
}
export function formatMessageDate(dateString: string) {
    const givenDate = new Date(dateString)
    const currentDate = new Date()
    if (
        givenDate.getDate() === currentDate.getDate() &&
        givenDate.getMonth() === currentDate.getMonth() &&
        givenDate.getFullYear() === currentDate.getFullYear()
    ) {
        return 'Today'
    }
    const yesterday = new Date(currentDate)
    yesterday.setDate(currentDate.getDate() - 1)
    if (
        givenDate.getDate() === yesterday.getDate() &&
        givenDate.getMonth() === yesterday.getMonth() &&
        givenDate.getFullYear() === yesterday.getFullYear()
    ) {
        return 'Yesterday'
    }
    const parsedDate = parseISO(dateString)
    const formattedDate = format(parsedDate, "dd MMMM',' yyyy, EEEE", { locale: enGB })
    return formattedDate
}




export default function getDateLabel(dateKey: string){
    const today = new Date()
    const yesterday = new Date()

    yesterday.setDate(today.getDate() - 1)

    const date = new Date(`${dateKey}T12:00:00`)

    if(date.toDateString() === today.toDateString()){
        return 'Today'
    }

     if(date.toDateString() === yesterday.toDateString()){
        return 'Yesterday'
    }

    return date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    })
}
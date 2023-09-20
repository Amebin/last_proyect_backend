const today = new Date()

function getDates(startDate, endDate, limitDays = 1) {
    if (!startDate) {
        startDate = new Date()
    }
    
    if (!endDate) {
        const daysFromNow = startDate
        daysFromNow.setDate(daysFromNow.getDate() + limitDays)
        endDate = daysFromNow
    }

    const dates = []
    let currentDate = startDate
    const oneDay = 24 * 60 * 60 * 1000

    while (currentDate <= endDate) {
        dates.push(new Date(currentDate))
        currentDate = new Date(currentDate.getTime() + oneDay)
    }

    return dates
}

export default getDates
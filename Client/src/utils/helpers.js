
function timeSince(article_date) {
    
    const published = article_date.includes('-') ? new Date(article_date) : new Date(parseInt(article_date))
    const now = new Date();
    const minute = 60000
    const hour = minute * 60
    const day = hour * 24
    const week = day * 7
    const year = week * 52

    const timeDelta = now - published ;

    switch (true) {
        case timeDelta < minute:
            return "less than a minute ago";
        case timeDelta < hour:
            const minutesSince = Math.floor(timeDelta/minute);
            if(minutesSince === 1) {
                return "1 minute ago";
            }
            return `${minutesSince} minutes ago`;
        case timeDelta < day:
            const hoursSince = Math.floor(timeDelta/hour);
            if(hoursSince === 1) {
                return "1 hour ago";
            }
            return `${hoursSince} hours ago`;
        case timeDelta < week:
            const daysSince = Math.floor(timeDelta/day);
            if(daysSince === 1) {
                return "1 day ago";
            }
            return `${daysSince} days ago`
        case timeDelta < year:
            const weeksSince = Math.floor(timeDelta/week);
            if(weeksSince === 1) {
                return "1 week ago";
            }
            return `${weeksSince} weeks ago`
        default:
            const yearsSince = Math.floor(timeDelta/year);
            if(yearsSince ===1) {
                return "1 year ago";
            }
            return `${yearsSince} years ago`
    }   
};

function format_date(article_date) {
    const date = article_date.includes('-') ? new Date(article_date) : new Date(parseInt(article_date))
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}/${day}/${year}`
}



module.exports = {timeSince, format_date }


// Function to format a Date object as "YYYY-MM-DD"
function formatDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// List of trading holidays for 2024 (sample list for US stock market)
const tradingHolidays = [
    "2024-01-01", // New Year's Day
    "2024-01-15", // Martin Luther King Jr. Day
    "2024-02-19", // Presidents' Day
    "2024-03-29", // Good Friday
    "2024-05-27", // Memorial Day
    "2024-07-04", // Independence Day
    "2024-09-02", // Labor Day
    "2024-11-28", // Thanksgiving Day
    "2024-12-25"  // Christmas Day
];

// Function to check if a date is a trading day
function isTradingDay(date) {
    const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday
    const formattedDate = formatDate(date);
    
    // Exclude weekends and holidays
    return dayOfWeek !== 0 && dayOfWeek !== 6 && !tradingHolidays.includes(formattedDate);
}

// Function to generate trading dates within a range
export function generateTradingDates(startDate, endDate) {
    const tradingDates = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        if (isTradingDay(currentDate)) {
            tradingDates.push(formatDate(currentDate));
        }
        // Move to the next day
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return tradingDates;
}

// Example usage: Generate trading dates between two dates
const start = new Date("2024-01-01");
const end = new Date("2024-01-31");
const tradingDates = generateTradingDates(start, end);
console.log("Trading dates in January 2024:", tradingDates);

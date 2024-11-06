export default function getDayOfWeek(day) {
    let stringDay = "";
    switch (day){
        case 1: 
            stringDay = "Monday"
            break;
        case 2: 
            stringDay = "Tuesday"
            break;
        case 3: 
            stringDay = "Wednesday"
            break;
        case 4: 
            stringDay = "Thursday"
            break;
        case 5: 
            stringDay = "Friday"
            break;
        case 6: 
            stringDay = "Saturday"
            break;
        case 7: 
            stringDay = "Sunday"
            break;
        default: 
            break;
    }

    return stringDay
}
// determine how much a user slept per given day of the week
function getSleepHours(day) {

    if (day == "Monday") {
      return 8;
    } else if (day == "Tuesday") {
      return 8;
    } else if (day == "Wednesday") {
      return 7;
    } else if (day == "Thursday") {
      return 8;
    } else if (day == "Friday") {
      return 6;
    } else if (day == "Saturday") {
      return 9;
    } else if (day == "Sunday") {
      return 8;
    }
   }
   
   // sum up the actual amount slept during the week
   const getActualSleepHours = () => {
     let actualSleepHours = getSleepHours("Monday") + getSleepHours("Tuesday") + getSleepHours ("Wednesday") + getSleepHours("Thursday") + getSleepHours("Friday") + getSleepHours("Saturday")  + getSleepHours("Sunday");
   
     return actualSleepHours;
   }
   
   // determine ideal amount of sleep
   const getIdealSleepHours = hours => {
     let idealHours = 7 * hours;
     return idealHours;
   }
   
   // determine the delta between actual and ideal amount of hours slept. Log to console.
   const calculateSleepDebt = () => {
     let actualSleepHours = getActualSleepHours();
     let idealSleepHours = getIdealSleepHours(7);
   
     if (idealSleepHours == actualSleepHours) {
       console.log("You got the perfect amount of sleep!");
     } else if (idealSleepHours < actualSleepHours) {
       console.log(`You got ${actualSleepHours - idealSleepHours} more hours than needed!`);
     } else if (idealSleepHours > actualSleepHours) {
       console.log(`You have a deficit of ${idealSleepHours - actualSleepHours} hours of sleep! Go to bed!`)
     }
   }
   
   calculateSleepDebt();
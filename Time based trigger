// This function sends a scheduled reminder email 3 days before the ad end date
function scheduleReminderEmail(row, sheet) {
  var rowValues = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  var adEndDate = rowValues[3]; // Column D (index 3)
  var brandName = rowValues[1]; // Column B (index 1)
  var adLink = rowValues[5]; // Column F (index 5)
  var emailAddress = 'karankhosla99@gmail.com'; // The primary email address to send the notification to
  var staticCcAddress = 'aadlersteam@gmail.com'; 
  var dynamicCcAddress = rowValues[11];
  var ccAddresses = staticCcAddress + ',' + dynamicCcAddress + ',' + emailAddress;

  // Check if the adEndDate is 3 days from now
  var today = new Date();
  var reminderDate = new Date(adEndDate);
  reminderDate.setDate(reminderDate.getDate() - 3); // 3 days before ad end date
  
  // If today is 3 days before the ad end date, schedule the reminder email
  if (isSameDay(today, reminderDate)) {
    var subject = 'Reminder: Ads for ' + brandName + ' Ending Soon';
    var message = 'This is an automated email to remind you that the ads for brand ' + brandName + ' are getting over on ' + adEndDate + '.\n\n' +
                  'Ad Link: ' + adLink + '\n\n' +
                  'Please contact Karan for further assistance.\n\n' +
                  'Regards,\nAadlers Developer Team';

    // Add the WhatsApp link with the encoded message for the reminder
    var encodedReminderMessage = encodeURIComponent(message);
    var whatsappReminderLink = 'https://wa.me/9087913484?text=' + encodedReminderMessage;

    message += '\n\nFor quick assistance, click the link to message on WhatsApp: ' + whatsappReminderLink;
    
    // Send the reminder email immediately
    MailApp.sendEmail({
      to: ccAddresses,
      subject: subject,
      body: message
    });
  }
}

// Helper function to check if two dates are the same day (ignoring time)
function isSameDay(date1, date2) {
  return date1.getFullYear() === date2.getFullYear() &&
         date1.getMonth() === date2.getMonth() &&
         date1.getDate() === date2.getDate();
}

// This function sets up a time-driven trigger to send the reminder email daily at 1:15 AM
function createTimeDrivenTrigger() {
  ScriptApp.newTrigger('checkEndDates')
           .timeBased()
           .everyDays(1) // Check every day
           .atHour(1)     // Run at 1 AM (set appropriate timezone)
           .nearMinute(15) // Run near 15th minute
           .create();
}

// This function checks all rows for end date within 3 days and sends reminders if needed
function checkEndDates() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rows = sheet.getDataRange().getValues();

  for (var i = 1; i < rows.length; i++) {
    var adEndDate = new Date(rows[i][3]); // Column D (index 3)
    if (adEndDate) {
      scheduleReminderEmail(i + 1, sheet); // Schedule reminder if the end date is within 3 days
    }
  }
}

// This function sets up the initial setup for the trigger
function setup() {
  createTimeDrivenTrigger();
}

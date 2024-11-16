function sendEmailOnFormSubmit(e) {
  var emailAddress = 'karankhosla99@gmail.com'; // Primary email address
  var staticCcAddress = 'aadlersteam@gmail.com'; // Static CC email address
  var subject = 'New Form Response Received';

  // Get the active sheet and the range of the new form submission
  var sheet = e.source.getActiveSheet();
  var range = e.range;
  
  // Get the values of the entire row that was added
  var row = range.getRow();
  var rowValues = sheet.getRange(row, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Get the headers from the first row
  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  
  // Construct the message with the new form response details
  var message = 'A new form response has been submitted:\n\n' +
                'Sheet Name: ' + sheet.getName() + '\n' +
                'Response Row: ' + row + '\n' +
                'Values:\n';
  
  for (var i = 0; i < headers.length; i++) {
    message += headers[i] + ': ' + rowValues[i] + '\n';
  }
  message +=' \n' +  'Please check sheet at - https://docs.google.com/spreadsheets/d/1onYXVa1xDIEG83OD3pyXU6N_o8n4G0Uh_ETWcgMXXoY/edit#gid=255952378';

  // Add the WhatsApp link with the encoded text
  var encodedMessage = encodeURIComponent(message); // Encode the entire message for URL
  var whatsappLink = 'https://wa.me/9087913484?text=' + encodedMessage;

  message += '\n\nFor quick assistance, click the link to message on WhatsApp: ' + whatsappLink;

  // Get the email address from the 12th column
  var dynamicCcAddress = rowValues[11]; // 12th column (index 11)
  
  // Combine the static CC address with the dynamic one from the form response
  var ccAddresses = staticCcAddress + ',' + dynamicCcAddress;
  
  // Send the email with CC
  MailApp.sendEmail({
    to: emailAddress,
    cc: ccAddresses,
    subject: subject,
    body: message
  });
  
  // After sending the form response email, schedule the reminder email
  scheduleReminderEmail(row, sheet);
}

// This function sets up the trigger to call sendEmailOnFormSubmit when a new form response is submitted
function createFormSubmitTrigger() {
  // Deletes any existing triggers to avoid duplicates
  deleteTriggers();
  
  // Create a new trigger
  ScriptApp.newTrigger('sendEmailOnFormSubmit')
           .forSpreadsheet(SpreadsheetApp.getActiveSpreadsheet())
           .onFormSubmit()
           .create();
}

// This function deletes all triggers for this project
function deleteTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  for (var i = 0; i < triggers.length; i++) {
    ScriptApp.deleteTrigger(triggers[i]);
  }
}

// This function sets up the initial setup for the trigger
function setup() {
  createFormSubmitTrigger();
}

// Mock test function to manually trigger the sendEmailOnFormSubmit function
function testSendEmailOnFormSubmit() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var range = sheet.getRange("A1"); // Example range, modify as needed

  var e = {
    source: SpreadsheetApp.getActiveSpreadsheet(),
    range: range,
    value: range.getValue(),
    oldValue: null
  };

  sendEmailOnFormSubmit(e);
}

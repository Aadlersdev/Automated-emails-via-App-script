function doGet() {
  return HtmlService.createHtmlOutputFromFile('index.html');
}

function submitForm(formData) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Append data to the sheet with timestamp
  var timestamp = new Date();
  var startDate = formData.startDate || new Date(); // Use today's date if not provided
  var endDate = formData.endDate || '';
  var budget = formData.budget || '';
  var linkOfAd = formData.linkOfAd || '';
  var stopAd = formData.stopAd || 'No';
  var urlToPause = formData.urlToPause || '';
  var useExistingBudget = formData.useExistingBudget || 'No';
  var audience = formData.audience || 'L1';
  var remarks = formData.remarks || '';
  var email = formData.email || '';
  var status = formData.status || '';

  sheet.appendRow([timestamp, formData.brandName, startDate, endDate, budget, linkOfAd, stopAd, 
                   urlToPause, useExistingBudget, audience, remarks, email, status]);
  

var admin = 'karankhosla99@gmail.com'; // Primary email address
var staticCcAddress = 'aadlersteam@gmail.com';
 var subject = 'Form Submission Received: ' + formData.brandName;
 var cc = admin +',' + staticCcAddress
  var message = 'Thank you for submitting your ad details.\n\n' +
                'Brand Name: ' + formData.brandName + '\n' +
                'Start Date: ' + startDate + '\n' +
                'End Date: ' + endDate + '\n' +
                'Budget: ' + budget + '\n' +
                'Ad Link: ' + linkOfAd + '\n' +
                'Audience: ' + audience + '\n' +
                'Remarks: ' + remarks + '\n' +
                'Email: ' + email + '\n' +
                'Status: ' + status + '\n\n' +
                'This is an automated confirmation email.';
                 // Add the WhatsApp link with the encoded message for the reminder
    var encodedReminderMessage = encodeURIComponent(message);
    var whatsappReminderLink = 'https://wa.me/9087913484?text=' + encodedReminderMessage;

    message += '\n\nFor quick assistance, click the link to message on WhatsApp: ' + whatsappReminderLink;

  // Send the email to the provided email address
  MailApp.sendEmail({
    to: email,
    cc: cc,
    subject: subject,
    body: message
  });

  return "Thank you for your submission!";
}
  



/**
 * CBS Service HUB - Web App entry point
 * Deploy as Web App: Execute as Me, Who has access: Anyone (or your org)
 */

function doGet(e) {
  return HtmlService.createTemplateFromFile('index')
    .evaluate()
    .setTitle('CBS Service HUB')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL)
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

/** Include HTML/CSS/JS partials in index template */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

// --- API exposed to client via google.script.run ---

function apiGetTickets() {
  return DataService.getTickets();
}

function apiSaveTickets(tickets) {
  return DataService.saveTickets(tickets);
}

function apiAppendTicket(ticket) {
  return DataService.appendTicket(ticket);
}

function apiUpdateTicket(ticket) {
  return DataService.updateTicket(ticket);
}

function apiValidateAdmin(username, password) {
  return Config.validateAdmin(username, password);
}

function apiGetNextTicketId() {
  return DataService.getNextTicketId();
}

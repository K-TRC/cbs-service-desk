/**
 * Ticket persistence via Google Sheets.
 * Default spreadsheet: งานพี่จุ๋ม
 * https://docs.google.com/spreadsheets/d/1iVZaCKwzfpq0w2ySidFXMS3EGqqsUW0bV6N4nU1V-vI/edit
 */

var DataService = (function () {
  var SPREADSHEET_NAME = 'CBS Service HUB - Tickets';
  var SHEET_NAME = 'Tickets';

  var HEADERS = [
    'id',
    'date',
    'bu',
    'branchCode',
    'branchName',
    'reporterName',
    'reporterEmail',
    'reporterPhone',
    'reporterPosition',
    'category',
    'description',
    'status',
    'images'
  ];

  function getSpreadsheetId_() {
    return Config.getSpreadsheetId();
  }

  function ensureHeaderRow_(sheet) {
    var firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
    var needsHeader = firstRow.join('').trim() === '' || firstRow[0] !== HEADERS[0];
    if (needsHeader) {
      sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
      sheet.getRange(1, 1, 1, HEADERS.length)
        .setFontWeight('bold')
        .setBackground('#e8f0fe');
      sheet.setFrozenRows(1);
    }
  }

  function openSpreadsheet_() {
    var spreadsheetId = getSpreadsheetId_();
    if (!spreadsheetId) {
      throw new Error('SPREADSHEET_ID is not configured.');
    }
    try {
      return SpreadsheetApp.openById(spreadsheetId);
    } catch (e) {
      throw new Error(
        'Cannot open spreadsheet. Share Editor access with the Google account that deploys this Web App. ID: ' + spreadsheetId
      );
    }
  }

  function createFallbackSpreadsheet_() {
    var spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    PropertiesService.getScriptProperties().setProperty('SPREADSHEET_ID', spreadsheet.getId());
    var sheet = spreadsheet.getSheets()[0];
    sheet.setName(SHEET_NAME);
    ensureHeaderRow_(sheet);
    return spreadsheet;
  }

  function getOrCreateSpreadsheet_() {
    try {
      return openSpreadsheet_();
    } catch (e) {
      return createFallbackSpreadsheet_();
    }
  }

  function getTicketsSheet_() {
    var spreadsheet = getOrCreateSpreadsheet_();
    var customName = Config.getSheetName();
    var sheet = null;

    if (customName) {
      sheet = spreadsheet.getSheetByName(customName);
      if (!sheet) {
        throw new Error('Sheet tab not found: ' + customName);
      }
    } else {
      sheet = spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.getSheets()[0];
    }

    ensureHeaderRow_(sheet);
    return sheet;
  }

  function ticketToRow_(ticket) {
    return HEADERS.map(function (key) {
      if (key === 'images') {
        return JSON.stringify(ticket.images || []);
      }
      return ticket[key] != null ? ticket[key] : '';
    });
  }

  function rowToTicket_(row) {
    var ticket = {};
    HEADERS.forEach(function (key, index) {
      var value = row[index];
      if (key === 'images') {
        try {
          ticket.images = value ? JSON.parse(value) : [];
        } catch (e) {
          ticket.images = [];
        }
        return;
      }
      if (key === 'date' && value instanceof Date) {
        ticket.date = value.toISOString();
        return;
      }
      ticket[key] = value != null && value !== '' ? String(value) : '';
    });
    return ticket;
  }

  function readTickets_() {
    var sheet = getTicketsSheet_();
    var lastRow = sheet.getLastRow();
    if (lastRow < 2) {
      return [];
    }

    var rows = sheet.getRange(2, 1, lastRow, HEADERS.length).getValues();
    return rows
      .filter(function (row) {
        return String(row[0] || '').trim() !== '';
      })
      .map(rowToTicket_);
  }

  function writeTickets_(tickets, optionalSheet) {
    if (!Array.isArray(tickets)) {
      throw new Error('Tickets must be an array');
    }

    var sheet = optionalSheet || getTicketsSheet_();
    var lastRow = sheet.getLastRow();

    if (lastRow > 1) {
      sheet.getRange(2, 1, lastRow, HEADERS.length).clearContent();
    }

    if (tickets.length === 0) {
      return 0;
    }

    var rows = tickets.map(ticketToRow_);
    sheet.getRange(2, 1, 1 + tickets.length, HEADERS.length).setValues(rows);
    return tickets.length;
  }

  function withLock_(fn) {
    var lock = LockService.getScriptLock();
    lock.waitLock(30000);
    try {
      return fn();
    } finally {
      lock.releaseLock();
    }
  }

  return {
    getTickets: function () {
      return withLock_(readTickets_);
    },

    saveTickets: function (tickets) {
      return withLock_(function () {
        return {
          success: true,
          count: writeTickets_(tickets),
          spreadsheetId: getSpreadsheetId_()
        };
      });
    },

    getNextTicketId: function () {
      return withLock_(function () {
        var tickets = readTickets_();
        var year = new Date().getFullYear();
        var maxNum = 0;

        tickets.forEach(function (t) {
          var match = String(t.id || '').match(/^TKT-(\d{4})-(\d+)$/);
          if (match && Number(match[1]) === year) {
            maxNum = Math.max(maxNum, Number(match[2]));
          }
        });

        var next = String(maxNum + 1).padStart(4, '0');
        return 'TKT-' + year + '-' + next;
      });
    },

    getSpreadsheetUrl: function () {
      return 'https://docs.google.com/spreadsheets/d/' + getSpreadsheetId_() + '/edit';
    }
  };
})();

/**
 * Google Apps Script API bridge for CBS Service HUB.
 * Falls back to localStorage when not running inside GAS Web App.
 */

const GasApi = (function () {
  function isGasRuntime() {
    return typeof google !== 'undefined' && google.script && google.script.run;
  }

  function runGas_(fnName, ...args) {
    return new Promise(function (resolve, reject) {
      if (!isGasRuntime()) {
        reject(new Error('Not running in Google Apps Script'));
        return;
      }
      var settled = false;
      var timer = setTimeout(function () {
        if (settled) return;
        settled = true;
        reject(new Error('Server request timed out. Please try again.'));
      }, 30000);
      google.script.run
        .withSuccessHandler(function (result) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          resolve(result);
        })
        .withFailureHandler(function (err) {
          if (settled) return;
          settled = true;
          clearTimeout(timer);
          reject(err instanceof Error ? err : new Error(String(err && err.message ? err.message : err)));
        })
        [fnName].apply(google.script.run, args);
    });
  }

  return {
    isGasRuntime: isGasRuntime,

    getTickets: function () {
      return runGas_('apiGetTickets');
    },

    saveTickets: function (tickets) {
      return runGas_('apiSaveTickets', tickets);
    },

    appendTicket: function (ticket) {
      return runGas_('apiAppendTicket', ticket);
    },

    updateTicket: function (ticket) {
      return runGas_('apiUpdateTicket', ticket);
    },

    validateAdmin: function (username, password) {
      return runGas_('apiValidateAdmin', username, password);
    },

    getNextTicketId: function () {
      return runGas_('apiGetNextTicketId');
    }
  };
})();

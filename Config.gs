/**
 * Runtime configuration — override via Script Properties after deploy.
 *
 * Script Properties (Project Settings > Script properties):
 *   ADMIN_USERNAME  — default: Admin
 *   ADMIN_PASSWORD  — default: 1234  (change in production!)
 *   SPREADSHEET_ID  — default: งานพี่จุ๋ม sheet (override in Script Properties)
 *   SHEET_NAME      — optional tab name; blank = use "Tickets" or first tab
 */

var Config = (function () {
  var DEFAULT_SPREADSHEET_ID = '1iVZaCKwzfpq0w2ySidFXMS3EGqqsUW0bV6N4nU1V-vI';

  function getProp_(key, defaultValue) {
    var value = PropertiesService.getScriptProperties().getProperty(key);
    return value !== null && value !== '' ? value : defaultValue;
  }

  return {
    getSpreadsheetId: function () {
      return getProp_('SPREADSHEET_ID', DEFAULT_SPREADSHEET_ID);
    },

    getSheetName: function () {
      return getProp_('SHEET_NAME', '');
    },

    getAdminUsername: function () {
      return getProp_('ADMIN_USERNAME', 'Admin');
    },

    getAdminPassword: function () {
      return getProp_('ADMIN_PASSWORD', '1234');
    },

    validateAdmin: function (username, password) {
      var u = String(username || '').trim();
      var p = String(password || '').trim();
      return u === this.getAdminUsername() && p === this.getAdminPassword();
    }
  };
})();

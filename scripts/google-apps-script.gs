/**
 * RefactorsLife — free form backend using Google Sheets.
 *
 * Every form on the site (ask, review, apply, collab, newsletter) is saved
 * as a row in its own tab of one Google Sheet, and you get an email for each.
 *
 * Setup (5 minutes):
 *  1. Create a Google Sheet, e.g. "RefactorsLife — Submissions".
 *  2. Extensions → Apps Script. Delete the sample code and paste this file.
 *  3. Set NOTIFY_EMAIL below (or leave empty for no emails). Save.
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as: Me      Who has access: Anyone
 *  5. Authorize, then copy the Web app URL (ends in /exec).
 *  6. Paste that URL into every entry of `forms` in assets/js/config.js.
 *
 * To change the script later: Deploy → Manage deployments → Edit → New version.
 */

const NOTIFY_EMAIL = ""; // e.g. "hello@refactorslife.in"

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.tryLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const formName = String(data.form || "other").replace(/[^a-z0-9_-]/gi, "").slice(0, 30) || "other";
    const sheet = getSheet_(formName);

    // Grow the header row when a form sends a new field.
    let headers = sheet.getLastColumn() ? sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0] : [];
    Object.keys(data).forEach((k) => {
      if (headers.indexOf(k) === -1) {
        headers.push(k);
        sheet.getRange(1, headers.length).setValue(k).setFontWeight("bold");
      }
    });

    const row = headers.map((h) => {
      const v = data[h];
      const s = Array.isArray(v) ? v.join(", ") : v == null ? "" : String(v);
      // Stop spreadsheet formula injection from user input.
      return /^[=+\-@]/.test(s) ? "'" + s : s;
    });
    sheet.appendRow(row);

    if (NOTIFY_EMAIL) {
      const body = headers.map((h, i) => h + ": " + row[i]).join("\n");
      MailApp.sendEmail(NOTIFY_EMAIL, "[RefactorsLife] New " + formName + " submission", body);
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function getSheet_(name) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

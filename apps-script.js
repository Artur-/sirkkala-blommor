// Klistra in detta i Apps Script (Extensions → Apps Script) i ditt Google Sheet.
// Publicera som Web App: Execute as = Me, Who has access = Anyone.

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // ── Betalningsbekräftelse ──────────────────────────────────────────────────
  if (data.action === "betalat") {
    markBetalat(sheet, data.namn, data.epost);
    return ok();
  }

  // ── Ny beställning ────────────────────────────────────────────────────────
  // Sätt rubrikrad om arket är tomt
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Tidstämpel", "Namn", "E-post",
      "Miljoonakello (vit)", "Miljoonakello (ljusröd)", "Miljoonakello (blå)", "Miljoonakello totalt",
      "Jordgubbar totalt",
      "Lumihiutale (vit)", "Lumihiutale (ljusröd)", "Lumihiutale (blå)", "Lumihiutale totalt",
      "Pelargon (vit)", "Pelargon (röd)", "Pelargon (ljusröd)", "Pelargon totalt",
      "Örter (basilika)", "Örter (timjan)", "Örter (mynta)", "Örter totalt",
      "Total summa (€)", "Betalat"
    ]);
  }

  sheet.appendRow([
    data.timestamp,
    data.namn,
    data.epost,
    data["miljoonakello_Vit"]        || 0,
    data["miljoonakello_Ljusröd"]    || 0,
    data["miljoonakello_Blå"]        || 0,
    data["miljoonakello_total"]      || 0,
    data["jordgubbar_total"]         || 0,
    data["lumihiutale_Vit"]          || 0,
    data["lumihiutale_Ljusröd"]      || 0,
    data["lumihiutale_Blå"]          || 0,
    data["lumihiutale_total"]        || 0,
    data["pelargon_Vit"]             || 0,
    data["pelargon_Röd"]             || 0,
    data["pelargon_Ljusröd"]         || 0,
    data["pelargon_total"]           || 0,
    data["orter_Basilika"]           || 0,
    data["orter_Timjan"]             || 0,
    data["orter_Mynta"]              || 0,
    data["orter_total"]              || 0,
    data.total_summa                 || 0,
    ""   // Betalat — fylls i av användaren via knappen
  ]);

  // Säkerställ att epost/telefon-kolumnen (C) sparas som text
  var lastRow = sheet.getLastRow();
  sheet.getRange(lastRow, 3).setNumberFormat("@");
  sheet.getRange(lastRow, 3).setValue(data.epost);

  return ok();
}

// Hitta raden på namn+epost och sätt ✓ i Betalat-kolumnen
function markBetalat(sheet, namn, epost) {
  const data = sheet.getDataRange().getValues();
  const headers = data[0];
  const betalatCol = headers.indexOf("Betalat");
  if (betalatCol === -1) return;

  const namnTrim = (namn || "").toString().trim().toLowerCase();
  const epostTrim = (epost || "").toString().trim().toLowerCase();

  for (let i = data.length - 1; i >= 1; i--) {
    const rowNamn = (data[i][1] || "").toString().trim().toLowerCase();
    const rowEpost = (data[i][2] || "").toString().trim().toLowerCase();
    if (rowNamn === namnTrim && rowEpost === epostTrim) {
      sheet.getRange(i + 1, betalatCol + 1).setValue("✓");
      return;
    }
  }
}

function ok() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

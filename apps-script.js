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
      "Örter (oregano)", "Örter (timjan)", "Örter (mynta)", "Örter totalt",
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
    data["orter_Oregano"]            || 0,
    data["orter_Timjan"]             || 0,
    data["orter_Mynta"]              || 0,
    data["orter_total"]              || 0,
    data.total_summa                 || 0,
    ""   // Betalat — fylls i av användaren via knappen
  ]);

  return ok();
}

// Hitta raden på namn+epost och sätt ✓ i Betalat-kolumnen
function markBetalat(sheet, namn, epost) {
  const data = sheet.getDataRange().getValues();
  for (let i = 1; i < data.length; i++) {
    if (data[i][1] === namn && data[i][2] === epost) {
      const lastCol = sheet.getLastColumn();
      sheet.getRange(i + 1, lastCol).setValue("✓");
      return;
    }
  }
}

function ok() {
  return ContentService
    .createTextOutput(JSON.stringify({ status: "ok" }))
    .setMimeType(ContentService.MimeType.JSON);
}

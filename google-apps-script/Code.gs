const SPREADSHEET_ID = "1eRC8PaupzeT8WJCjuGhovm4pB8ZfApxgxbdavGVYkNQ";
const SHEET_NAME = "Data";

function doPost(event) {
  const lock = LockService.getScriptLock();

  try {
    lock.waitLock(10000);

    const data = JSON.parse(event.postData.contents || "{}");
    const fullName = cleanCell(data.full_name);
    const phone = cleanCell(data.phone);

    if (!fullName || !phone) {
      return jsonResponse({ ok: false, message: "Thiếu họ tên hoặc số điện thoại." });
    }

    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);

    if (!sheet) {
      throw new Error("Không tìm thấy trang tính: " + SHEET_NAME);
    }

    sheet.appendRow([
      new Date(),
      fullName,
      phone,
      cleanCell(data.email),
      cleanCell(data.experience),
      cleanCell(data.interest),
      cleanCell(data.note),
      cleanCell(data.utm_source),
      cleanCell(data.utm_medium),
      cleanCell(data.utm_campaign),
    ]);

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: error.message });
  } finally {
    lock.releaseLock();
  }
}

function cleanCell(value) {
  const text = String(value || "").trim();

  if (!text) {
    return "";
  }

  // Giữ số 0 đầu số điện thoại và ngăn dữ liệu người dùng trở thành công thức.
  return "'" + text.replace(/^'+/, "");
}

function jsonResponse(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

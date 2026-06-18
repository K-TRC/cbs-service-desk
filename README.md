# CBS Service HUB — Google Apps Script

Maintenance Service Portal สำหรับ CBS Project แปลงเป็น **Google Apps Script Web App** พร้อม deploy ผ่าน [clasp](https://github.com/google/clasp) และเก็บ source บน GitHub

## โครงสร้างโปรเจค

| ไฟล์ | หน้าที่ |
|------|--------|
| `Code.gs` | `doGet()` เปิด Web App + API สำหรับ client |
| `DataService.gs` | เก็บ tickets ใน Google Sheets (sheet `Tickets`) |
| `Config.gs` | ตั้งค่า Admin (Script Properties) |
| `index.html` | หน้า UI หลัก |
| `app.js` / `gas-api.js` | Frontend + bridge เรียก `google.script.run` |
| `stores.js` | ข้อมูลสาขา (autocomplete) |
| `appsscript.json` | Manifest (timezone, webapp settings) |

## ความต้องการ

- Node.js 18+
- บัญชี Google ที่ใช้ Apps Script
- [Google clasp](https://github.com/google/clasp)

## ติดตั้งครั้งแรก

```bash
npm install
npx clasp login
```

### สร้างโปรเจค Apps Script ใหม่ (ครั้งแรกเท่านั้น)

```bash
npm run create
```

คำสั่งนี้จะสร้าง Apps Script project และเขียน `scriptId` ลงใน `.clasp.json` อัตโนมัติ

ถ้ามีโปรเจคอยู่แล้ว ให้ใส่ Script ID ใน `.clasp.json`:

```json
{
  "scriptId": "YOUR_SCRIPT_ID_HERE",
  "rootDir": "."
}
```

หา Script ID ได้จาก URL: `https://script.google.com/home/projects/SCRIPT_ID/edit`

## Push โค้ดขึ้น Google

```bash
npm run push
```

## Deploy เป็น Web App

1. รัน `npm run open` เพื่อเปิด Apps Script Editor
2. **Deploy** → **New deployment** → ประเภท **Web app**
3. ตั้งค่า:
   - **Execute as:** Me
   - **Who has access:** Anyone (หรือ Anyone within organization)
4. คัดลอก URL ที่ได้มาแจกให้ผู้ใช้

หรือใช้ CLI:

```bash
npm run deploy
```

## ตั้งค่า Admin (แนะนำหลัง deploy)

ใน Apps Script Editor → **Project Settings** → **Script properties**:

| Property | ค่าเริ่มต้น | คำอธิบาย |
|----------|------------|----------|
| `ADMIN_USERNAME` | `Admin` | ชื่อผู้ดูแลระบบ |
| `ADMIN_PASSWORD` | `1234` | รหัสผ่าน (เปลี่ยนใน production) |
| `SPREADSHEET_ID` | `1iVZaCKwzfpq0w2ySidFXMS3EGqqsUW0bV6N4nU1V-vI` | [งานพี่จุ๋ม](https://docs.google.com/spreadsheets/d/1iVZaCKwzfpq0w2ySidFXMS3EGqqsUW0bV6N4nU1V-vI/edit) — Sheet หลักของโปรเจค |
| `SHEET_NAME` | (ว่าง) | ชื่อแท็บ — ว่างไว้จะใช้แท็บแรก (`ชีต1`) อัตโนมัติ |

## Push ขึ้น GitHub

```bash
git init
git add .
git commit -m "Add CBS Service HUB Apps Script project"
git remote add origin https://github.com/YOUR_USER/cbs-service-desk.git
git push -u origin main
```

**อย่า commit** ไฟล์ `.clasprc.json` (token ของ clasp) — มีใน `.gitignore` แล้ว

## การทำงานของข้อมูล

- เมื่อรันบน **Apps Script Web App**: tickets ถูกเก็บใน [Google Sheet งานพี่จุ๋ม](https://docs.google.com/spreadsheets/d/1iVZaCKwzfpq0w2ySidFXMS3EGqqsUW0bV6N4nU1V-vI/edit) แท็บแรก (`ชีต1`) — แถว 1 เป็นหัวตาราง แถว 2+ เป็นข้อมูล
- **สำคัญ:** แชร์ Sheet ให้ Google account ที่ deploy Web App เป็น **Editor** ไม่งั้น Apps Script เปิด Sheet ไม่ได้
- รูปแนบ (base64) เก็บในคอลัมน์ `images` เป็น JSON — ควรบีบอัดรูปก่อนแนบ (แอปทำให้อยู่แล้ว)
- เมื่อเปิดไฟล์ HTML แบบ static (ทดสอบ local): ใช้ `localStorage` เหมือนเดิม

## คำสั่งที่มีประโยชน์

| คำสั่ง | ความหมาย |
|--------|----------|
| `npm run push` | อัปโหลดโค้ดไป Apps Script |
| `npm run pull` | ดึงโค้ดจาก Apps Script ลงเครื่อง |
| `npm run open` | เปิด Editor ในเบราว์เซอร์ |

## License

Internal use — CBS Project Portal

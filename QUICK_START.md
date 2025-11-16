# Quick Start - After Adding Service Account Key

## ✅ Step 1: Verify JSON Format

Make sure your `.env.local` file has the service account key in this format:

```env
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"myapp-5de51",...}'
```

**Important:**
- The entire JSON must be on a **single line** (no line breaks)
- It should be wrapped in single quotes `'...'`
- If your JSON has multiple lines, use a JSON minifier or remove all newlines manually

## ✅ Step 2: Restart Development Server

1. **Stop** your current development server (press `Ctrl+C` in the terminal)
2. **Start** it again:
   ```bash
   npm run dev
   ```

## ✅ Step 3: Test It

1. Go to your admin dashboard: `http://localhost:3000/admin`
2. Click "View Subadmins" button
3. Click the three dots (⋮) next to a subadmin
4. Click "Edit"
5. Change the email address
6. Click "Save"

**Expected Result:**
- ✅ No error messages
- ✅ Success notification appears
- ✅ The subadmin can now login with the new email

## 🔍 Troubleshooting

### If you see "Firebase Admin SDK not initialized":
- Check that `FIREBASE_SERVICE_ACCOUNT_KEY` is in `.env.local`
- Make sure the JSON is on a single line
- Restart the dev server

### If you see "Invalid service account key":
- Verify the JSON is complete (should start with `{"type":"service_account"...`)
- Make sure there are no extra quotes or characters
- Try regenerating the key from Firebase Console

### Check Server Logs:
Look at your terminal/console where `npm run dev` is running. Any initialization errors will be logged there.


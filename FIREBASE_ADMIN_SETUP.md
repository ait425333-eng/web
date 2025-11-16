# Firebase Admin SDK Setup Guide

To enable email and password updates for subadmins, you need to set up Firebase Admin SDK.

## Step 1: Get Service Account Key

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`myapp-5de51`)
3. Click on the gear icon ⚙️ next to "Project Overview"
4. Select **Project settings**
5. Go to the **Service accounts** tab
6. You'll see "Admin SDK configuration snippet" with options (Node.js, Java, Python, Go)
   - **Select Node.js** (since we're using Next.js/Node.js) - this is just for reference
7. **Important:** Look for the **"Generate new private key"** button (usually at the bottom of the page)
8. Click **Generate new private key**
9. Click **Generate key** in the confirmation dialog
10. A JSON file will be downloaded (e.g., `myapp-5de51-firebase-adminsdk-xxxxx.json`) - this is your service account key

## Step 2: Add to Environment Variables

1. Open your `.env.local` file (create it if it doesn't exist in the root directory)
2. Add the service account key as a JSON string:

```env
# Add this line to your .env.local file
FIREBASE_SERVICE_ACCOUNT_KEY='{"type":"service_account","project_id":"myapp-5de51",...}'
```

**Important:** 
- Copy the entire JSON content from the downloaded file
- Remove all newlines and format it as a single line
- Or use a JSON minifier to convert it to a single line

### Alternative: Using a File (More Secure)

If you prefer not to store the key in environment variables, you can:

1. Save the service account JSON file as `firebase-service-account.json` in your project root
2. Add it to `.gitignore` to prevent committing it
3. Update `app/api/admin/update-subadmin/route.ts` to read from the file:

```typescript
import serviceAccount from "../../../../firebase-service-account.json"

adminApp = initializeApp({
  credential: cert(serviceAccount as any),
})
```

## Step 3: Restart Your Development Server

After adding the environment variable, restart your Next.js development server:

```bash
npm run dev
```

## Verification

After setup, when you edit a subadmin's email:
- ✅ Email will be updated in Firebase Authentication
- ✅ Email will be updated in Firestore
- ✅ Subadmin can login with the new email

## Troubleshooting

### Error: "Firebase Admin SDK not initialized"

- Make sure `FIREBASE_SERVICE_ACCOUNT_KEY` is set in `.env.local`
- Make sure the JSON is properly formatted (single line, no newlines)
- Restart your development server after adding the variable

### Error: "Invalid service account key"

- Verify the JSON is complete and properly formatted
- Make sure you copied the entire content from the downloaded file
- Try regenerating the service account key

### Still having issues?

Check the server console logs for detailed error messages. The API route will log any initialization errors.


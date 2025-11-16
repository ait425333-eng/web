# Troubleshooting Firebase Connection Issues

## ⚠️ Common Error: "Missing or insufficient permissions"

**If you see this error**, it means Firestore security rules are blocking access. 

**Quick Fix:**
1. Go to Firebase Console → Firestore Database → **Rules** tab
2. Replace rules with: `allow read, write: if true;`
3. Click **Publish**
4. Refresh your page

See `FIX_FIRESTORE_PERMISSIONS.md` for detailed instructions.

---

## Common Error: "Failed to fetch users"

### Step 1: Verify .env.local File Exists

1. Check that `.env.local` file exists in the root directory: `c:\Users\TANZEEL\project1_web\web\.env.local`
2. The file should contain:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCc8CJqJCoK57WubekZlp0wI0LqmL_daP0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=myapp-5de51.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=myapp-5de51
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=myapp-5de51.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=649515331727
NEXT_PUBLIC_FIREBASE_APP_ID=1:649515331727:web:22835ea035095354fb80fa
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-GQQZ8YYPYJ
```

### Step 2: Restart Development Server

**IMPORTANT**: After creating or modifying `.env.local`, you MUST restart your development server:

1. Stop the server (Ctrl+C in terminal)
2. Start it again:
   ```bash
   npm run dev
   ```

Environment variables are only loaded when the server starts!

### Step 3: Check Browser Console

1. Open your browser
2. Press **F12** to open Developer Tools
3. Go to the **Console** tab
4. Look for error messages - they will tell you exactly what's wrong

Common console errors:
- `Missing environment variables: ...` - .env.local not loaded
- `permission-denied` - Firestore security rules blocking access
- `collection not found` - Collection name mismatch

### Step 4: Verify Firestore is Enabled

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `myapp-5de51`
3. Click **Firestore Database** in the left sidebar
4. If you see "Create database", click it and create the database
5. Make sure the database is in **Native mode** (not Datastore mode)

### Step 5: Check Firestore Security Rules

1. In Firebase Console → **Firestore Database**
2. Click on the **Rules** tab
3. For testing, you can use these permissive rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2026, 1, 1);
    }
  }
}
```

**⚠️ WARNING**: These rules allow anyone to read/write. Only use for testing!

4. Click **Publish** to save the rules

### Step 6: Verify Collection Name

1. In Firebase Console → **Firestore Database**
2. Check what collection name your Flutter app uses
3. If it's not "users", update `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_USERS_COLLECTION=your_collection_name
```

4. Restart the development server

### Step 7: Check Network Tab

1. Open browser Developer Tools (F12)
2. Go to **Network** tab
3. Refresh the page
4. Look for failed requests to `firestore.googleapis.com`
5. Check the error response

## Quick Checklist

- [ ] `.env.local` file exists in project root
- [ ] All environment variables are set (no empty values)
- [ ] Development server was restarted after creating `.env.local`
- [ ] Firestore Database is enabled in Firebase Console
- [ ] Firestore security rules allow read access
- [ ] Collection name matches (check in Firestore Console)
- [ ] Browser console checked for detailed errors
- [ ] Internet connection is working

## Testing Firebase Connection

You can test if Firebase is configured correctly by checking the browser console. You should see:

```
Fetching users from collection: users
Users snapshot size: X
Fetched users: X
```

If you see errors instead, check the error code:
- `permission-denied` → Fix Firestore security rules
- `unavailable` → Check internet connection
- `not-found` → Collection doesn't exist, create it or check collection name

## Still Having Issues?

1. **Check the exact error in browser console** (F12 → Console)
2. **Verify Firebase project ID matches** in `.env.local` and Firebase Console
3. **Try creating a test document** in Firestore manually to verify it's working
4. **Check if you're logged in** - some Firestore rules require authentication

## Need More Help?

Share the exact error message from the browser console (F12 → Console tab) for more specific help.


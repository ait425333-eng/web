# Fix Firestore Permission Denied Error

## Error: "Missing or insufficient permissions"

This error means your Firestore security rules are blocking read access. Here's how to fix it:

## Quick Fix (For Testing/Development)

### Step 1: Open Firestore Rules

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `myapp-5de51`
3. Click **Firestore Database** in the left sidebar
4. Click on the **Rules** tab

### Step 2: Update Security Rules

Replace the existing rules with these **temporary test rules** (for development only):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents (FOR TESTING ONLY)
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

### Step 3: Publish Rules

1. Click **Publish** button
2. Wait a few seconds for the rules to update

### Step 4: Test Again

Refresh your admin dashboard page - it should now work!

## Production-Ready Rules (For Later)

Once everything is working, update to these secure rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - allow admins to read all users
    match /users/{userId} {
      // Allow read if user is authenticated and is admin/subadmin
      allow read: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role in ['admin', 'subadmin'];
      
      // Allow write only to admins
      allow write: if request.auth != null && 
        exists(/databases/$(database)/documents/users/$(request.auth.uid)) &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Alternative: Test Mode Rules

If you're still in test mode, you might see rules like this:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.time < timestamp.date(2025, 12, 31);
    }
  }
}
```

If the date has passed, update it to a future date or use the rules above.

## Verify Rules Are Applied

1. After publishing, wait 10-20 seconds
2. Refresh your admin dashboard
3. Check browser console - the error should be gone

## Still Having Issues?

1. Make sure you clicked **Publish** (not just Save)
2. Wait a few seconds for rules to propagate
3. Hard refresh the page (Ctrl+F5)
4. Check that you're logged in as an admin user


# Admin Dashboard Setup Guide

This guide will help you set up the admin dashboard with Firebase authentication and Firestore database.

## Important: Using Existing Firebase Project

If you already have a Firebase project for your Flutter app, you can use the **same project** for the web app. Firebase projects can have multiple apps (iOS, Android, Web) that all share the same:
- Firestore database
- Authentication users
- Storage buckets
- Cloud Functions

You just need to **add a web app** to your existing Firebase project.

## Prerequisites

1. A Firebase project (create one at https://console.firebase.google.com/ or use existing)
2. Node.js and npm installed

## Step 1: Install Dependencies

The required dependencies have already been installed:
- `firebase` - Firebase SDK
- `@tanstack/react-table` - Table component library

## Step 2: Add Web App to Existing Firebase Project

If you already have a Firebase project for Flutter:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your **existing project** (the one you use for Flutter)
3. Go to **Project Settings** (gear icon next to "Project Overview")
4. Scroll down to **Your apps** section
5. If you don't see a web app, click the **Web** icon (`</>`) to add a web app
6. Register your web app:
   - Enter an app nickname (e.g., "INSAF Web Admin")
   - Check "Also set up Firebase Hosting" (optional)
   - Click **Register app**
7. Copy the Firebase configuration object that appears

**Note**: If you already have a web app in your project, you can use its configuration.

## Step 3: Enable Authentication (if not already enabled)

1. Go to **Authentication** in Firebase Console
2. If not already enabled, click **Get started**
3. Go to **Sign-in method** tab
4. Enable **Email/Password** provider (if not already enabled)

## Step 4: Verify Firestore Database

Since you're using the same project as Flutter, your Firestore database should already exist:

1. Go to **Firestore Database** in Firebase Console
2. Verify that your `users` collection exists (or whatever collection name you use in Flutter)
3. Check that the data structure matches what the web app expects

**Important**: Make sure the field names in your Firestore documents match what the web app expects:
- `name`, `email`, `phone`, `address`, `status`, `role`, `createdAt`, etc.

## Step 5: Get Firebase Configuration for Web

## Step 6: Configure Environment Variables

1. Create a `.env.local` file in the root of your project
2. Add your Firebase configuration:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

Replace the placeholder values with your actual Firebase configuration.

**Optional**: If your Flutter app uses a different collection name than "users", you can add:
```env
NEXT_PUBLIC_FIREBASE_USERS_COLLECTION=your_collection_name
```

## Step 7: Verify Firestore Data Structure

Since you're using the same Firebase project as Flutter, check that your Firestore documents have the fields the web app expects:

### Expected Fields in User Documents:

- `name` (string) - User's full name
- `email` (string) - User's email address
- `phone` (string) - User's phone number
- `address` (string) - User's address
- `status` (string) - One of: `"pending"`, `"accepted"`, `"rejected"` (defaults to "pending" if missing)
- `role` (string) - One of: `"admin"`, `"subadmin"`, `"user"` (defaults to "user" if missing)
- `createdAt` (timestamp) - Registration date
- `updatedAt` (timestamp) - Last update date

**Note**: If your Flutter app uses different field names, you can either:
1. Update the Flutter app to use these field names, OR
2. Update the web app code to match your Flutter app's field names

### Example Document Structure:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "address": "123 Main St, City, Country",
  "status": "pending",
  "role": "user",
  "createdAt": "2025-01-15T10:00:00Z",
  "updatedAt": "2025-01-15T10:00:00Z"
}
```

## Step 8: Create Admin Users

**See `CREATE_ADMIN_USER.md` for detailed step-by-step instructions.**

Quick steps:
1. Go to **Authentication** in Firebase Console → **Add user**
2. Create user with email/password (e.g., `admin@insafmining.com`)
3. **Copy the User UID** that appears
4. Go to **Firestore Database** → `users` collection
5. Create a new document with:
   - **Document ID**: Paste the User UID from step 3
   - **Fields**:
     - `role`: `"admin"` (or `"subadmin"`)
     - `email`: Same email as Authentication
     - `name`: `Admin User`
     - `status`: `"accepted"`
     - `createdAt`: timestamp (click timestamp icon → "now")
     - `updatedAt`: timestamp (click timestamp icon → "now")

## Step 9: Access the Admin Dashboard

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to `/admin/login` to sign in
3. Use the email and password of the admin user you created
4. After successful login, you'll be redirected to `/admin` dashboard

## Features

### Admin Dashboard (`/admin`)
- **Stats Cards**: Display total, accepted, rejected, and pending applicants
- **Users Table**: 
  - View all registered users
  - Sort by columns (name, email, status)
  - Search by name, email, or phone
  - Pagination (10 items per page)
  - Status badges with color coding

### Authentication
- Only users with `admin` or `subadmin` role can access the dashboard
- Automatic redirect to login if not authenticated
- Logout functionality

## Security Rules (Recommended)

For production, set up proper Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection - only admins can read all users
    match /users/{userId} {
      allow read: if request.auth != null && 
        (get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin' ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'subadmin');
      allow write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }
  }
}
```

## Troubleshooting

### "Failed to fetch users"
- Check that your Firebase environment variables are set correctly
- Verify that Firestore is enabled in your Firebase project
- Ensure the `users` collection exists

### "Checking authentication..." loop
- Verify that the user document exists in Firestore with the correct role
- Check that the User UID in Authentication matches the document ID in Firestore

### Can't access admin dashboard
- Ensure the user's role in Firestore is set to `"admin"` or `"subadmin"`
- Check browser console for errors
- Verify Firebase configuration is correct

## Next Steps

- Add functionality to update user status (accept/reject)
- Implement user editing capabilities
- Add export functionality (CSV/PDF)
- Set up email notifications
- Add more detailed filtering options


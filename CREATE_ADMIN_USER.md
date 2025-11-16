# How to Create an Admin User in Firebase

This guide will walk you through creating an admin user that can access the admin dashboard.

## Method 1: Using Firebase Console (Recommended)

### Step 1: Create User in Firebase Authentication

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (`myapp-5de51`)
3. Click on **Authentication** in the left sidebar
4. If Authentication is not enabled:
   - Click **Get started**
   - Go to the **Sign-in method** tab
   - Enable **Email/Password** provider
5. Go to the **Users** tab
6. Click **Add user** button (or **Add user** in the top right)
7. Enter the admin credentials:
   - **Email**: `admin@insafmining.com` (or your preferred email)
   - **Password**: Create a strong password
   - Click **Add user**
8. **Important**: Copy the **User UID** that appears (you'll need this in the next step)
   - It looks like: `abc123xyz456def789...`

### Step 2: Create Admin Document in Firestore

1. In Firebase Console, click on **Firestore Database** in the left sidebar
2. If Firestore is not set up:
   - Click **Create database**
   - Choose **Start in test mode** (for now)
   - Select a location (choose closest to your users)
   - Click **Enable**
3. Click on **Start collection** (if no collections exist) or click on your existing collection
4. If you need to create the `users` collection:
   - Collection ID: `users`
   - Click **Next**
5. Create a new document:
   - **Document ID**: Paste the **User UID** you copied from Step 1
   - Click **Next**
6. Add the following fields:

   | Field | Type | Value |
   |-------|------|-------|
   | `name` | string | `Admin User` (or your name) |
   | `email` | string | `admin@insafmining.com` (same as Authentication email) |
   | `role` | string | `admin` |
   | `status` | string | `accepted` |
   | `phone` | string | (optional) |
   | `address` | string | (optional) |
   | `createdAt` | timestamp | Click the timestamp icon and select "now" |
   | `updatedAt` | timestamp | Click the timestamp icon and select "now" |

7. Click **Save**

### Step 3: Verify Admin User

1. The document should now exist in Firestore with:
   - Document ID = User UID from Authentication
   - `role` field = `"admin"`
   - `email` field = the email you used in Authentication

## Method 2: Using Firebase CLI (Advanced)

If you have Firebase CLI installed:

```bash
# Install Firebase CLI (if not installed)
npm install -g firebase-tools

# Login to Firebase
firebase login

# Create user via CLI
firebase auth:import users.json
```

## Method 3: Programmatically (For Development)

You can also create admin users programmatically using a script. Create a file `scripts/create-admin.js`:

```javascript
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();
const auth = admin.auth();

async function createAdmin() {
  try {
    // Create user in Authentication
    const userRecord = await auth.createUser({
      email: 'admin@insafmining.com',
      password: 'YourSecurePassword123!',
      emailVerified: true,
    });

    console.log('User created:', userRecord.uid);

    // Create document in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      name: 'Admin User',
      email: 'admin@insafmining.com',
      role: 'admin',
      status: 'accepted',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    console.log('Admin user created successfully!');
    console.log('UID:', userRecord.uid);
  } catch (error) {
    console.error('Error creating admin:', error);
  }
}

createAdmin();
```

## Quick Checklist

- [ ] User created in Firebase Authentication
- [ ] User UID copied
- [ ] Document created in Firestore with User UID as document ID
- [ ] `role` field set to `"admin"` or `"subadmin"`
- [ ] `email` field matches Authentication email
- [ ] `status` field set to `"accepted"`

## Testing the Admin Login

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Navigate to: `http://localhost:3000/admin/login`

3. Enter your admin credentials:
   - Email: The email you used in Authentication
   - Password: The password you set

4. You should be redirected to `/admin` dashboard

## Troubleshooting

### "User document doesn't exist"
- Make sure the document ID in Firestore matches the User UID from Authentication
- Check that the document is in the `users` collection (or your configured collection name)

### "Checking authentication..." loop
- Verify the `role` field is exactly `"admin"` or `"subadmin"` (case-sensitive)
- Check browser console for errors
- Ensure Firestore rules allow reading the user document

### Can't access admin dashboard
- Verify the user document has `role: "admin"` or `role: "subadmin"`
- Check that you're using the correct email/password
- Make sure Email/Password authentication is enabled in Firebase Console

### Firestore collection name mismatch
- If your Flutter app uses a different collection name, update `.env.local`:
  ```env
  NEXT_PUBLIC_FIREBASE_USERS_COLLECTION=your_collection_name
  ```

## Creating Multiple Admins

To create additional admin users:
1. Repeat Step 1 (create user in Authentication)
2. Repeat Step 2 (create document in Firestore with new User UID)
3. Set `role` to `"admin"` or `"subadmin"` as needed

## Creating Subadmin Users

Subadmins have the same access as admins. To create a subadmin:
- Follow the same steps as creating an admin
- Set `role` field to `"subadmin"` instead of `"admin"`


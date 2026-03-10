# CodeLeap Network - Frontend Challenge

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-Frontend-purple)
![Status](https://img.shields.io/badge/status-completed-green)

Frontend application developed as part of the **CodeLeap Frontend Technical Challenge**.

The application allows users to create, edit, delete and view posts from the CodeLeap API.

---

# Preview

## Login Screen

User enters a username to access the application.

## Posts Feed

Displays all posts retrieved from the API.

## Create Post

Users can create new posts by entering a title and content.

## Edit / Delete

Users can edit or delete their own posts.

---

# Technologies

This project was built using:

* React
* TypeScript
* Vite
* Axios
* React Query
* CSS

---

# API

The application consumes the public API:

https://dev.codeleap.co.uk/careers/


# Project Structure

```
src
 ├── components
 │   ├── CreatePost
 │   ├── PostCard
 │   ├── EditModal
 │   └── DeleteModal
 │
 ├── hooks
 │   └── usePosts.ts
 │
 ├── services
 │   └── api.ts
 │
 ├── types
 │   └── Post.ts
 │
 ├── pages
 │   ├── Login
 │   └── Home
 │
 ├── App.tsx
 └── main.tsx
```

---

# Running the Project

Clone the repository

```bash
git clone https://github.com/your-user/codeleap-test.git
```

Enter the project folder

```bash
cd codeleap
```

Install dependencies

```bash
npm install
```

Run the development server

```bash
npm run dev
```

The application will run at:

```
http://localhost:5173
```

---

# Features

* User login with username
* Create posts
* Edit posts
* Delete posts
* Posts list
* Modal confirmation
* LocalStorage for user persistence
* API integration
* State management using React Query

---

# Screenshots

You can add screenshots of the application interface here.

Example:

```
/screenshots/login.png
/screenshots/feed.png
/screenshots/create-post.png
/screenshots/edit-post.png
```

---

# Future Improvements

* Pagination support
* Responsive mobile layout
* Better error handling
* Loading states

---

# Author

Developed by **Cayo Garcia**

---

# License

This project was developed for study and technical evaluation purposes.

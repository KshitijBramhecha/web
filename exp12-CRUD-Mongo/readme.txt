# MongoDB CRUD Operations

This is a minimal implementation of CRUD (Create, Read, Update, Delete) operations using MongoDB, Node.js, Express, and basic HTML/JavaScript.

## Setup Instructions

1. Install dependencies:
```bash
npm init -y
npm install express mongodb body-parser
```

2. Make sure MongoDB is installed and running on your system

3. Create a project structure:
```
project-folder/
├── server.js
└── public/
    └── index.html
```

4. Copy the server.js and index.html files from the artifacts

5. Start the server:
```bash
node server.js
```

6. Open your browser and navigate to: http://localhost:3000

## Features

### 1. Create Operation
- Add new items with name and description
- Shows success/error messages

### 2. Update Operation
- Select an existing item from dropdown
- Update name and/or description
- Shows success/error messages

### 3. Delete Operation
- Select an existing item from dropdown
- Delete the selected item
- Shows success/error messages

### Additional Feature
- View all items in a table
- Refresh list to see latest changes

## Customization

You can modify the MongoDB connection string in server.js:
```javascript
const mongoUrl = 'mongodb://localhost:27017';
const dbName = 'crudDemo';
const collectionName = 'items';
```

## Notes

This is a minimal implementation focused on demonstrating the core CRUD operations. In a production environment, you would want to add:

- Input validation
- Authentication
- Environment variables for database credentials
- Error handling improvements
- Unit tests
- More sophisticated UI

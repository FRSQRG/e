# Comprehensive Documentation for Employee Discount

## Table of Contents
1. [Introduction](#introduction)
2. [Setup and Installation](#setup-and-installation)
3. [Structure of the Application](#structure-of-the-application)
4. [Detailed Component Overviews](#detailed-component-overviews)
   1. [Admin View](#admin-view)
   2. [User Details Dialog](#user-details-dialog)
   3. [Firebase Initialization](#firebase-initialization)
   4. [Home Component](#home-component)
5. [Firebase Integration](#firebase-integration)
6. [Styling and Material-UI](#styling-and-material-ui)
7. [User Guide](#user-guide)
8. [Developer Guide](#developer-guide)
9. [Conclusion](#conclusion)

## Introduction
This React application serves as a platform for managing user data, providing an admin interface for data interaction. Firebase is utilized for backend services such as data storage and user authentication.

## Setup and Installation
To set up the application locally:

1. **Clone the Repository**: `git clone <repository-url>`
2. **Install Dependencies**: `npm install`
3. **Firebase Setup**: Set up a Firebase project, obtain your configuration, and update `firebase/init.tsx`
4. **Start the Application**: `npm start`

## Structure of the Application
The `src` directory contains all source code including components, pages, and utility files. It follows a modular structure to separate concerns and enhance maintainability.

## Detailed Component Overviews

### Admin View
`src/pages/admin-view.tsx`

- **Overview**: This is the main dashboard for the admin, displaying an overview of user data, visits, discounts, and interactive charts. It allows for user interaction including viewing detailed user information and managing user statuses.
- **Key Functions**:
  - `fetchData`: Fetches user data and visits from Firebase, processes it, and updates the local state to render the data.
  - `handleCloseDialog`: Closes the user details dialog.
  - `handleOpenDialog`: Opens the user details dialog, setting the selected user's data.
  - `handleDialogAction`: Handles blacklist/whitelist actions from the user details dialog.
  - `handleChangePage`: Handles pagination page changes.
  - `handleChangeRowsPerPage`: Handles changes in the number of rows displayed per page.

### User Details Dialog
`src/components/user-dialog.tsx`

- **Overview**: This component is a dialog that pops up to show detailed user information and provides options to blacklist or whitelist a user.
- **Key Functions**:
  - `handleDelete`: Handles the blacklist/whitelist action, confirming the action with the admin before proceeding.

### Firebase Initialization
`src/firebase/init.tsx`

- **Overview**: Contains the Firebase configuration and initialization code.
- **Usage**: Replace placeholder configuration with actual Firebase project configuration to connect the application to your Firebase backend.

### Home Component
`src/components/home.tsx`

- **Overview**: Displays detailed information specific to a user. This includes user visits, discounts received, and any other personalized data.
- **Usage**: This component can be further extended to include additional user-specific features, analytics, and personalized recommendations based on user behavior and data.

## Firebase Integration
The application is heavily integrated with Firebase for backend services. Understanding Firebase Firestore for data storage and Firebase Authentication for user management is crucial for further development and maintenance.

## Styling and Material-UI
The application utilizes Material-UI for styling and UI components. Familiarity with Material-UI is required for making styling changes and understanding the UI component structure.

## User Guide
- **Admin Dashboard**: View overall user visits and discounts.
- **User Management**: Click on a user row in the table to view detailed information and manage user status.
- **Charts and Analytics**: View trends in visits, bills, and discounts over time.

## Developer Guide
- **Codebase Navigation**: Familiarize yourself with the `src` directory structure and component organization.
- **State Management**: Understand the usage of React Hooks for state management across components.
- **Firebase Interaction**: Enhance your knowledge of Firebase services used in the application for data fetching and user management.

## Conclusion
This documentation provides a thorough and detailed overview of the React application, aiding both end-users and developers in navigating, using, and understanding the platform.

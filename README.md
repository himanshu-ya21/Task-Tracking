# Task Tracking App

A React Native mobile application for managing and tracking tasks efficiently. Built with modern technologies including Redux for state management, SQLite for local storage, and Firebase for messaging capabilities.

## Features

- **Task Management**: Create, view, and edit tasks with titles and timestamps
- **Local Storage**: Persistent data storage using SQLite database
- **State Management**: Redux Toolkit for predictable state management
- **Navigation**: Smooth navigation between task list and task form screens
- **Cross-Platform**: Supports both iOS and Android devices
- **Firebase Integration**: Ready for push notifications and messaging (currently configured)

## Technology Stack

- **React Native**: Framework for building native mobile apps
- **Redux Toolkit**: State management library
- **SQLite**: Local database for data persistence
- **React Navigation**: Navigation library for screen transitions
- **Firebase**: Backend services for messaging and notifications
- **TypeScript**: Type safety and better development experience

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (version 18 or higher)
- npm or yarn
- React Native development environment
- Xcode (for iOS development)
- Android Studio (for Android development)

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd TaskTracking
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **iOS Setup:**
   ```bash
   cd ios
   pod install
   cd ..
   ```

4. **Android Setup:**
   - Ensure Android SDK is properly configured
   - Copy `google-services.json` to `android/app/` directory

5. **Firebase Configuration:**
   - For iOS: Add `GoogleService-Info.plist` to `ios/TaskTracking/` directory
   - For Android: Add `google-services.json` to `android/app/` directory

## Usage

1. **Start the Metro bundler:**
   ```bash
   npm start
   # or
   yarn start
   ```

2. **Run on iOS:**
   ```bash
   npm run ios
   # or
   yarn ios
   ```

3. **Run on Android:**
   ```bash
   npm run android
   # or
   yarn android
   ```

## Project Structure

```
TaskTracking/
├── android/                 # Android specific files
├── ios/                     # iOS specific files
├── src/
│   ├── components/          # Reusable UI components
│   ├── database/            # SQLite database configuration
│   ├── redux/               # State management (store, slices, hooks)
│   ├── screens/             # App screens (TaskList, TaskForm)
│   └── utils/               # Utility functions (Firebase config)
├── App.js                  # Main app component
├── package.json            # Dependencies and scripts
└── README.md               # Project documentation
```

## Key Components

- **TaskListScreen**: Displays all tasks in a scrollable list
- **TaskFormScreen**: Form for creating and editing tasks
- **Database**: SQLite operations for task persistence
- **Redux Store**: Centralized state management for tasks

## Development

- **Linting:** `npm run lint`
- **Testing:** `npm test`
- **Type Checking:** TypeScript is configured for better development experience

## Troubleshooting

If you encounter issues:

1. Clear Metro cache: `npx react-native start --reset-cache`
2. Clean and rebuild:
   - iOS: `cd ios && rm -rf build && cd .. && npm run ios`
   - Android: `cd android && ./gradlew clean && cd .. && npm run android`
3. Reinstall pods: `cd ios && pod install`

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is licensed under the MIT License.

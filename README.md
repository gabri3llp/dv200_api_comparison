# Steam Stats Explorer

## Overview

Steam Stats Explorer is a React-based web application that allows users to explore, compare and visualise statistics from games available on Steam.

The application retrieves game information and review statistics through the Steam API and presents the data using interactive charts. The goal is to make game comparisons easier by turning raw statistics into clear and understandable visualisations.

## Features

- **Game Selection:** Search for and select games to explore their information and statistics.
- **Game Information:** View details such as game titles, release dates, descriptions and prices.
- **Review Statistics:** Retrieve positive, negative and total review counts from Steam.
- **Data Visualisation:** Use interactive charts to explore and compare game statistics:
  - Pie Chart – Compares positive and negative reviews.
  - Bar Chart – Compares Steam review ratings.
  - Scatter Plot – Explores the relationship between game prices and review ratings.
- **Responsive Interface:** Uses Bootstrap and custom CSS to create a user-friendly interface.

## Technologies Used

| Technology | Purpose |
|---|---|
| React | Building the application and reusable components. |
| JavaScript | Application functionality and data processing. |
| Axios | Handling HTTP requests to external APIs. |
| Steam API | Retrieving game information and review statistics. |
| Corsfix | Acting as a proxy for external API requests. |
| Chart.js | Creating data visualisations. |
| React Chart.js 2 | Integrating Chart.js with React components. |
| Bootstrap | Styling and responsive layouts. |

## Getting Started

Follow these instructions to run the project locally.

### Prerequisites

You will need the following installed:

- [Node.js](https://nodejs.org/)
- npm (included with Node.js)
- A code editor such as [Visual Studio Code](https://code.visualstudio.com/)

### Installation

1. Clone or download this repository.
2. Open the project folder in your code editor.
3. Open a terminal in the project directory.
4. Install the project dependencies:

   ```bash
   npm install
   ```

### Running the Application

Start the development server:

```bash
npm start
```

The application will open in your browser at:

`http://localhost:3000`

The page will automatically reload when changes are made to the source code.

## API Integration

The application uses the Steam API to retrieve game details and review statistics.

Axios handles the HTTP requests, while Corsfix is used as a proxy to assist with cross-origin restrictions when communicating with Steam's endpoints.

An active internet connection is required to retrieve external game information and statistics.

## Data Visualisation

Chart.js is used to transform the retrieved Steam statistics into visual representations.

Each chart serves a different purpose, allowing users to explore review distributions, compare ratings and examine the relationship between game prices and review ratings.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the application in development mode.

### `npm test`

Launches the test runner in interactive watch mode.

### `npm run build`

Builds the application for production and saves the optimised files to the `build` folder.

### `npm run eject`

Ejects the Create React App configuration. This is a one-way operation and is not required to run the application.

## Future Improvements

Potential improvements for future development include:

- Expanding the available game selection.
- Introducing additional comparison metrics and visualisations.
- Improving API error handling and loading states.
- Further refining the interface and user experience.

## Author

Gabriel Pulella 251298
Developed as part of the DV200 coursework at Open Window.

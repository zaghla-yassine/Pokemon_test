# Pokémon Web Application

This Pokémon web application is built to display Pokémon data in an interactive and user-friendly way. It uses the PokeAPI to fetch data and offers features such as search, filter, sorting, and pagination, allowing users to find specific Pokémon and view details about their stats.

## 1. Features

- **Pokémon List**: View a list of Pokémon with their basic stats and images.
- **Search by Name**: Find specific Pokémon by entering part of their name.
- **Filter by Type**: Filter Pokémon by their type (e.g., Water, Fire, Grass).
- **Sort by Stat**: Sort Pokémon based on various stats like HP, Attack, and Speed.
- **Search by Stat Range**: Find Pokémon based on specific stat ranges (e.g., HP > 50).
- **Pagination**: Browse through multiple pages of Pokémon, with 9 Pokémon per page.
- **Responsive Design**: Optimized for both desktop and mobile views.

## 2. Technologies Used

- **React** and **TypeScript**: For building a robust and type-safe user interface.
- **Tailwind CSS**: For fast and responsive styling.
- **Apollo Client** (with GraphQL): For data fetching and state management.
- **PokeAPI**: As the primary data source for Pokémon data.

## 3. Getting Started

### Prerequisites

- **Node.js** and **npm** installed
- Basic understanding of React and TypeScript

### Installation

. **Clone the repository:**
   git clone https://github.com/zaghla-yassine/Pokemon_test.git
. **Install dependencies**
    npm install
. **Start the development server:** 
    npm start
. **Open your browser and go to http:**
  //localhost:3000 to view the application.

## 4. Usage
. **Main Functionalities:**
*Search by Name: Use the search bar at the top to search for Pokémon by name. Enter a name, and the list will filter automatically to show matching Pokémon. //
*Filter by Type: Use the dropdown to filter Pokémon by type. This narrows down the list to show only Pokémon of the selected type.//
*Sort by Stat: Select a stat (e.g., Attack, Speed) to sort the Pokémon list based on that stat in descending order.//
*Search by Stat Range: Input a stat name and minimum value to filter Pokémon based on the selected stat's value.//
*Pagination: Use the pagination component at the bottom to navigate through pages.

## 5.Components
The app is organized with reusable components for easy maintenance and scalability:
. **App.tsx:** Main component that manages the application’s state and renders other components.//
. **SearchBar.tsx:** Input component for searching Pokémon by name.//
. **FilterByType.tsx:** Dropdown component for filtering Pokémon by type.//
. **SortOptions.tsx:** Component for selecting stat-based sorting options.//
. **StatSearch.tsx:** Component for searching Pokémon by specific stat values.//
. **PokemonList.tsx:** Renders the list of Pokémon cards.//
. **Pagination.tsx:** Component for pagination controls.

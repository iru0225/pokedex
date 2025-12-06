# Pokédex App

A modern, responsive Pokédex application built with React, TypeScript, Tailwind CSS, and Redux Toolkit. Browse, search, and explore detailed information about Pokémon from the PokéAPI.

## Features

- 🎮 Browse Pokémon with infinite scrolling
- 🔍 Search Pokémon by name or ID
- 📱 Fully responsive design
- ⚡ Fast performance with Vite
- 📊 View detailed Pokémon stats, abilities, types, height, and weight
- 🔄 Redux state management
- 💪 Type-safe with TypeScript

## Tech Stack

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client
- **PokéAPI** - Pokémon data source

## Project Structure

```
src/
├── components/
│   ├── LoadingScreen        # Global loading screen
│   ├── PokemonCard          # Component for showing the card of pokemon
│   └── SearchBar            # Search functionality
├── pages/
│   ├── Home                 # Home page that showing list of component
│   ├── detail               # Detail page for showing the detail of pokemon
├── store/
│   ├── store.ts             # Redux store configuration
│   ├── pokemonSlice.ts      # Pokemon slice with async thunks
│   └── hooks.ts             # Typed Redux hooks
├── types/
│   └── pokemon.ts           # TypeScript interfaces
├── App.tsx                  # Main app component
├── main.tsx                 # App entry point
└── index.css                # Main global css token
```

## Getting Started

### Prerequisites

**Important:** This project requires Node.js version 20.19+ or 22.12+ due to Vite 7 requirements.

Check your Node.js version:
```bash
node --version
```

If you need to upgrade Node.js, visit [nodejs.org](https://nodejs.org/) or use a version manager like [nvm](https://github.com/nvm-sh/nvm).

### Installation

1. Install dependencies:
```bash
npm install
```

### Development

Start the development server:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

### Linting

Run ESLint:
```bash
npm run lint
```

## Usage

1. **Browse Pokémon**: Scroll through the grid of Pokémon cards
2. **Load More**: Use the pagination buttons to load more Pokémon
3. **Search**: Enter a Pokémon name or ID in the search bar
4. **View Details**: Click on any Pokémon card to see detailed information including:
   - Pokémon artwork
   - Types with color coding
   - Height and weight
   - Abilities
   - Base stats with visual bars

## Redux Store

The app uses Redux Toolkit for state management with the following structure:

- **pokemonList**: Array of currently displayed Pokémon
- **selectedPokemon**: Currently selected Pokémon for detail view
- **loading**: Loading state for async operations
- **error**: Error messages
- **currentPage**: Current pagination offset
- **totalCount**: Total number of Pokémon available

### Async Actions

- `fetchPokemonList`: Fetches a paginated list of Pokémon
- `fetchPokemonById`: Fetches a specific Pokémon by ID
- `searchPokemon`: Searches for a Pokémon by name

## API

This app uses the [PokéAPI](https://pokeapi.co/) to fetch Pokémon data.

Base URL: `https://pokeapi.co/api/v2`

## Styling

The app uses CSS Modules for component-specific styling, with custom color schemes for Pokémon types.

## Future Enhancements

- Add favorites functionality
- Implement filtering by type
- Add Pokémon evolution chains
- Include move lists
- Add team builder feature
- Implement offline support with PWA

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Acknowledgments

- [PokéAPI](https://pokeapi.co/) for providing the Pokémon data
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management

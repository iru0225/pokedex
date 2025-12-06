import React, { useState } from 'react';
import { useAppDispatch } from '../../store/hooks';
import { clearError } from '../../store/pokemonSlice';
import styles from './searchBar.module.css';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate()
  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/pokemon/${searchTerm}`)
  };

  const handleClear = () => {
    setSearchTerm('');
    dispatch(clearError());
  };

  return (
    <div className={styles.searchBar}>
      <form onSubmit={handleSearch} className={styles.form}>
        <div className={styles.inputContainer}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search Pokemon by name"
            className={styles.input}
          />
          <button
            type="submit"
            className={styles.searchButton}
          >
            Search
          </button>
          {searchTerm && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
            >
              Clear
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default SearchBar;

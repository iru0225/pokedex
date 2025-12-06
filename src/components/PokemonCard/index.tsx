import React from 'react';
import type { Pokemon } from '../../types/pokemon';
import style from './pokemonCard.module.css'
import clsx from 'clsx';

interface PokemonCardProps {
  pokemon: Pokemon;
  onClick: () => void;
  ref?: React.Ref<HTMLDivElement>;
}

const typeColors: { [key: string]: string } = {
  normal: 'bg-gray-400',
  fire: 'bg-red-500',
  water: 'bg-blue-500',
  electric: 'bg-yellow-400',
  grass: 'bg-green-500',
  ice: 'bg-blue-200',
  fighting: 'bg-red-700',
  poison: 'bg-purple-500',
  ground: 'bg-yellow-600',
  flying: 'bg-indigo-400',
  psychic: 'bg-pink-500',
  bug: 'bg-green-400',
  rock: 'bg-yellow-700',
  ghost: 'bg-purple-700',
  dragon: 'bg-indigo-700',
  dark: 'bg-gray-800',
  steel: 'bg-gray-500',
  fairy: 'bg-pink-300',
};

const PokemonCard: React.FC<PokemonCardProps> = React.forwardRef(({ pokemon, onClick }, ref) => {
  const primaryType = pokemon.types[0].type.name;
  const typeColor = typeColors[primaryType];

  return (
    <div
      onClick={onClick}
      className={style['card-container']}
      ref={ref}
    >
      <div className={clsx(typeColor, style['image-container'])}>
        <img
          src={pokemon.sprites.other['official-artwork'].front_default || pokemon.sprites.front_default}
          alt={pokemon.name}
          className={style['pokemon-image']}
        />
      </div>
      <div style={{ padding: '1rem'}}>
        <p className={style['card-number']}>#{pokemon.id.toString().padStart(3, '0')}</p>
        <h3 className={style['card-name']}>{pokemon.name}</h3>
        <div style={{ display: 'flex', gap: '4px'}}>
          {pokemon.types.map((type) => (
            <span
              key={type.type.name}
              className={clsx(
                typeColors[type.type.name],
                style['card-type']
              )}
            >
              {type.type.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

export default PokemonCard;

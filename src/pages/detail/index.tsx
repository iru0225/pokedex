import { useNavigate, useParams } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { useEffect, useRef, useState } from "react"
import { searchPokemon } from "../../store/pokemonSlice"
import clsx from "clsx";
import style from './detail.module.css'
import searchStyle from '../../components/SearchBar/searchBar.module.css'

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

const Detail = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [size, setSize] = useState<{ width: number; height: number }>({ width: 0, height: 0 })
  const imageRef = useRef<HTMLImageElement>(null)
  const {
    selectedPokemon
  } = useAppSelector(state => state.pokemon)

  useEffect(() => {
    if (id) {
      dispatch(searchPokemon(id))
    }
  }, [dispatch, id])

  useEffect(() => {
    const updateSize = () => {
      if (imageRef.current) {
        const { width } = imageRef.current.getBoundingClientRect()
        setSize({ width, height: width })
      }
    }

    updateSize()
    window.addEventListener('resize', updateSize)
    
    return () => window.removeEventListener('resize', updateSize)
  }, [selectedPokemon])

  const convertSize = (data: number) => data/10

  return(
    <section>
      <button
        className={searchStyle.searchButton}
        onClick={() => navigate('/')}
      >
        Back to Home
      </button>
      {selectedPokemon ? (
        <div
          className={style['container']}
        >
          <div className={clsx("flex justify-center flex-col items-center")}>
            <h1 style={{
              fontWeight: 'bold',
              fontSize: '30px',
              textTransform: 'capitalize',
              marginBottom: '1rem'
            }}>{selectedPokemon.name}</h1>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <div
                style={{
                  ...size,
                  position: 'absolute',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0
                }}
                className={style['spinner']}
              >
                <div></div>
              </div>
              <img
                ref={imageRef}
                style={{ position: 'relative', zIndex: 1, width: '300px', height: '300px', objectFit: 'contain' }}
                src={selectedPokemon.sprites.other['official-artwork'].front_default || selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />
            </div>
          </div>
          <div className={style['info-container']}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '.5rem'
              }}
            >
              <h2>Type</h2>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '.5rem'
                }}
              >
                {
                  selectedPokemon.types.map(typesData => (
                    <span
                      className={clsx(
                        style['type-pill'],
                        typeColors[typesData.type.name]
                      )}
                    >
                      {typesData.type.name}
                    </span>
                  ))
                }
              </div>
              <h2>Height: {convertSize(selectedPokemon.height)}m</h2>
              <h2>Weight: {convertSize(selectedPokemon.weight)}Kg</h2>
              <h2>Base Status</h2>
              {
                selectedPokemon.stats.map((stat) => (
                  <div>
                    {stat.stat.name}
                    <div
                      style={{
                        position: "relative",
                        width: '100%',
                        height: '1rem',
                        background: 'rgba(0,0,0, 0.2)',
                        overflow: 'hidden'
                      }}
                    >
                      <span
                        style={{
                          position: 'absolute',
                          inset: '0',
                          width: `${stat.base_stat}%`,
                        }}
                        className={typeColors[selectedPokemon.types[0].type.name]}
                      />
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
        </div>
      ) : (
        <p>No Pokemon selected</p>
      )}
    </section>
  )
}

export default Detail
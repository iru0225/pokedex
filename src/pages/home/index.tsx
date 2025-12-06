import { useCallback, useEffect, useRef, useState } from "react"
import { useAppDispatch, useAppSelector } from "../../store/hooks"
import { fetchPokemonList } from "../../store/pokemonSlice"
import PokemonCard from "../../components/PokemonCard"
import { useNavigate } from "react-router-dom"

const HomePage = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { pokemonList } = useAppSelector(state => state.pokemon)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    dispatch(fetchPokemonList({ offset }))
  }, [dispatch, offset])

  const observer = useRef<IntersectionObserver | null>(null)
  const lastElement = useCallback((node: HTMLDivElement) => {
    if (observer.current) {
      observer.current.disconnect()
    }
    observer.current = new IntersectionObserver(entries => {
      console.log(entries[0].intersectionRatio);
      
      if (entries[0].isIntersecting) {
        console.log('masuk sini');
        
        setOffset(prevOffset => prevOffset + 20)
      }
    })
    if (node) observer.current.observe(node)
  }, [])

  return(
    <section
        style={{
          width: '95%',
          margin: '0 auto'
        }}
      >
      <div style={{
        display: 'flex',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        {
          pokemonList.map((pokemon, index) => (
            <PokemonCard
              {...(index === pokemonList.length - 1 && { ref: lastElement })}
              key={pokemon.id}
              pokemon={pokemon}
              onClick={() => navigate(`/pokemon/${pokemon.id}`)}
            />
          ))
        }
      </div>
    </section>
  )
}

export default HomePage
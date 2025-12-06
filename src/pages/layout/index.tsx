import { Outlet } from "react-router-dom"
import SearchBar from "../../components/SearchBar/SearchBar"
import LoadingScreen from "../../components/LoadingScreen"
import { useAppSelector } from "../../store/hooks"
import { useEffect } from "react"
import { clearError } from "../../store/pokemonSlice"

const PageLayout = () => {
  const { loading, error } = useAppSelector(state => state.pokemon)
  
  useEffect(() => {
    if (error) {
      const interval = setInterval(() => {
        clearError()
      }, 3000)

      return () => {
        clearInterval(interval)
      }
    }
  }, [error])

  useEffect(() => {
    if (loading) {
      document.body.style.overflowY = 'none'
    } else {
      document.body.style.overflowY = 'auto'
    }
  }, [loading])
  return(
    <div
      style={{
        width: '100%',
        backgroundColor: 'white',
        paddingTop: '.5rem'
      }}
    >
      {loading && <LoadingScreen />}
      <SearchBar />
      <Outlet />
      {
        error && <div style={{
        width: '400px',
        background: '#ef4444',
        minHeight: '50px',
        color: 'white',
        fontSize: '14px',
        position: 'absolute',
        bottom: '10%',
        right: 0,
        padding: '.5rem'
      }}>
        {error}
      </div>
      }
    </div>
  )
}

export default PageLayout
import style from './loadingScreen.module.css'
const LoadingScreen = () => {
  const renderPokeBall = () => {
    return(
      <div className={style["pokeball"]}>
        <div className={style["pokeball-top"]}></div>
        <div className={style["pokeball-middle"]}></div>
        <div className={style["pokeball-button"]}></div>
        <div className={style["pokeball-bottom"]}></div>
      </div>
    )
  }
  return(
    <div className={style["backdrop"]}>
      <div className={style["loading-container"]}>
        {renderPokeBall()}
        {renderPokeBall()}
        {renderPokeBall()}
      </div>
    </div>
  )
}

export default LoadingScreen
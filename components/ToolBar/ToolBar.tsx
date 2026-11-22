import type { Photo } from '../PhotoViewer/PhotoViewer'
import styles from './toolBar.module.css'
import { ClipLoader } from 'react-spinners'


export default function ToolBar({isPending, selectedId, handleMoveTrash, handleFav, isLoadingFav, allFavorited, favAction} : {
    isPending: boolean
    selectedId: number[]
    handleMoveTrash: () => void
    handleFav: (value: boolean) => void
    isLoadingFav: boolean
    allFavorited: boolean
    favAction: string | null
}){
   
    function loadStateText(){
        if(isPending && selectedId.length > 0){
            return <div className={styles.load}>
              <ClipLoader color="white" size={17}/> 
              <p>Moving {selectedId.length} {selectedId.length > 1 ? "photos" : 'photo'} to Trash...</p>
            </div>
        }
         if (isLoadingFav) {
    return (
      <div className={styles.load}>
        <ClipLoader color="white" size={17} />
        <p>
          {favAction === 'unfav'
            ? `Removing ${selectedId.length} ${selectedId.length > 1 ? "photos" : "photo"} from Favourites...`
            : `Adding ${selectedId.length} ${selectedId.length > 1 ? "photos" : "photo"} to Favourites...`}
        </p>
      </div>
    );
  }
        
            return <p>{selectedId.length} Selected</p>
        
     }
    return (
        <div className={styles.select_box}>
          {loadStateText()}
            <div className={styles.button_container}>

            {allFavorited ? 
            <button disabled={isPending || isLoadingFav} onClick={() => handleFav(false)} className={styles.unfavorite_button}>
              Unfavorite
            </button> 
            :
            <button disabled={isPending || isLoadingFav} onClick={() => handleFav(true)} className={styles.favorite_button}>
                Favorite
            </button>}

            {selectedId.length > 0 && <button onClick={handleMoveTrash} className={styles.delete_button}>
                Delete
            </button>}

            </div>
            
         </div>
    )
}
import { useEffect, useState } from 'react'
import './App.css'
import MasonryLayout from './components/Masonrylayout'
import fetchPhotos from './services/PhotosAPI';
import { PexelsPhoto } from './shared/interfaces/photos';

function App() {
const [photos, setPhotos] = useState<PexelsPhoto[]>([])
const [errorMsg, setErrorMsg] = useState<null | string>(null);
const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchPhotos();
        setPhotos(data.photos);
        setErrorMsg(null);
      } catch (error) {
        if(error instanceof Error) {
          setErrorMsg(error.message);
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchData();
  },[])

  if(isLoading) {
    return <div>Loading...</div>
  }

  if(errorMsg) {
    return <div>Error: {errorMsg}</div>
  }

  return (
    <div className='app-layout'>
      <MasonryLayout items={photos} />
    </div>
  )
}

export default App

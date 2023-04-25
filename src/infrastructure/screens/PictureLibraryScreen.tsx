import { Image, SafeAreaView } from 'react-native'
import { collection, getFirestore, doc, getDoc } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { db } from '../../services/firebase'

type Props = {
  userId : string
}

const PictureLibraryScreen: React.FC<Props> = ({ userId }) => {

  const [photos, setPhotos] = useState<Image[]>([])

  useEffect(() => {
    
  })
  return (
    <SafeAreaView className='flex-1'>

    </SafeAreaView>
  );
}

export default PictureLibraryScreen;
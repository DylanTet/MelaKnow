import { View, Text, Modal, TouchableOpacity } from 'react-native'
import React from 'react'

interface PredictionResponse {
    Prediction: string;
}

interface InfoModalProps {
    isVisible: boolean;
    closeModal: () => void;
    data: string | undefined;
}

const InfoModal: React.FC<InfoModalProps> = ({ isVisible, closeModal, data }) => {
  return (
    <Modal
        animationType="slide"
        transparent={true}
        visible={isVisible}
        onRequestClose={() => closeModal()}
    >
        <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className='flex-1 justify-center align-middle'>
            <View style={{ backgroundColor: 'white', borderRadius: 10}} className='align-middle m-6'>
                <View className='p-8'>
                    <Text style={{ fontSize: 25, fontWeight: "bold"}} className='pt-2 underline'>Results From Your Scan</Text>
                    <Text style={{ fontSize: 20 }} className='mt-7 text-center'>{data}</Text>
                    <TouchableOpacity onPress={() => closeModal()} style={{ borderRadius: 5, backgroundColor: "#00dbff" }} className='mt-7'>
                        <Text style={{ fontSize: 20, fontWeight: "bold",  }} className='p-3 mx-auto'>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    </Modal>
  )
}

export default InfoModal


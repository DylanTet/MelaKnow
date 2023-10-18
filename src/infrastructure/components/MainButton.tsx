import { Button } from "react-native-paper";

type Props = {
    buttonText: string,
    onPress: () => void,
    customStyling?: string
}

const MainButton: React.FC<Props> = ({ buttonText, onPress, customStyling }) => {
    const classStyling = `bg-cyan-400 w-3/4 rounded-full mx-auto justify-center ${customStyling}`

    return (
        <Button 
            style={{ height: 50 }} 
            className={classStyling}
            mode="contained"
            labelStyle={{ fontSize: 20 }}
            onPress={onPress}
        >
            { buttonText }
        </Button>
    )
}

export default MainButton;
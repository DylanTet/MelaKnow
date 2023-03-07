import { Button } from "react-native-paper";

type Props = {
    buttonText: string,
}

const MainButton: React.FC<Props> = ({ buttonText }) => {

    return (
        <Button style={{ height: 50 }} className="bg-cyan-400 w-3/4 rounded-full mx-auto justify-center" 
                mode="contained"
                labelStyle={{ fontSize: 20 }}>
            { buttonText }
        </Button>
    )
}

export default MainButton;
import MainButton from '../src/infrastructure/components/MainButton';
import { render, fireEvent } from '@testing-library/react-native';

describe('handleScanButtonPress', () => {
    it('should change the scan button to results button', () => {
        const mockHandleScanButtonPress = jest.fn();
        const { getByText } = render(
            <MainButton
               onPress={mockHandleScanButtonPress}
            />
        );

        const scanButton = getByText('Scan');
        fireEvent.click(scanButton);
        
        expect(mockHandleScanButtonPress).toHaveBeenCalled();
        
        const resultsButton = getByText('See Results');
        expect(resultsButton).toBeInTheDocument();
    })
})

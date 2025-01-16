import { useMemo } from "react";
import { useWindowDimensions } from "react-native"
const NUM_COLUMNS = 10; // Кількість стовпців у гріді
export const useColumns = () => {
    const { width } = useWindowDimensions()
    return useMemo(() => ({
        width: width / NUM_COLUMNS,
        height: width / NUM_COLUMNS,
        totalColumns: NUM_COLUMNS
    }), [width])
}
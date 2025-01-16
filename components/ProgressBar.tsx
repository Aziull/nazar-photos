import { StyleSheet, Text, View, ViewStyle } from "react-native";

interface Props {
    processed: number,
    total: number,
    style?: ViewStyle
}
export default function ProgressBar({ processed, total, style }: Props) {
    const propgess = processed / total * 100;
    return (
        <View style={style}>
            <View style={styles.container}>
                <View style={{
                    width: `${propgess}%`,
                    height: '100%',
                    backgroundColor: 'blue',
                    borderTopRightRadius: 10,
                    borderBottomRightRadius: 10
                }} />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 10,
        borderRadius: 10,
        backgroundColor: '#eee',
        overflow: 'hidden'
    },
})
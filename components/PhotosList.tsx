import { useColumns } from "@/hooks/useColums";
import { usePhotosSectionList } from "@/hooks/usePhotosSectionList";
import { Section } from "@/types";
import { SectionList, StyleSheet } from "react-native";

interface PhotosListProps {
    sections: Section[]
}

export default function PhotosList({ sections }: PhotosListProps) {
    const { width, height, totalColumns } = useColumns()

    const {
        renderSectionList,
        sectionListKeyExtractor,
        renderSectionHeader,
    } = usePhotosSectionList({ width, height, totalColumns });
    return (
        <SectionList
            windowSize={150}
            removeClippedSubviews
            style={styles.container}
            contentContainerStyle={styles.contentContainerStyle}
            sections={sections}
            keyExtractor={sectionListKeyExtractor}
            renderItem={renderSectionList}
            renderSectionHeader={renderSectionHeader}
        />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    contentContainerStyle: {
        gap: 10
    }
})
import { useColumns } from "@/hooks/useColums";
import { usePhotosSectionList } from "@/hooks/usePhotosSectionList";
import { Section } from "@/types";
import { Asset } from "expo-media-library";
import { SectionList } from "react-native";

interface PhotosListProps {
    sections: Section[]
    loadMoreAssets: () => void
}

export default function PhotosList({ sections, loadMoreAssets }: PhotosListProps) {
    const { width, height, totalColumns } = useColumns()

    const {
        renderSectionList,
        sectionListKeyExtractor,
        renderSectionHeader,
    } = usePhotosSectionList({ width, height, totalColumns });
    return (
        <SectionList
            removeClippedSubviews
            style={{
                flex: 1,
                width: '100%',
            }}
            contentContainerStyle={{
                gap: 10
            }}
            onEndReached={loadMoreAssets}
            onEndReachedThreshold={0.5}
            sections={sections}
            keyExtractor={sectionListKeyExtractor}
            renderItem={renderSectionList}
            renderSectionHeader={renderSectionHeader}
        />
    )
}
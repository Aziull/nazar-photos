import { Image } from 'expo-image';
import { Asset } from 'expo-media-library';
import { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
const PLACEHOLDER = require('@/assets/images/placeholder-rect.png');
const SEPARATOR_HEIGHT = 1
export const usePhotosSectionList = ({
    totalColumns,
    width,
    height,
}: {
    totalColumns: number;
    width: number;
    height: number;
}) => {
    const renderFlatListImage = useCallback(
        ({ item: photo, index }: { item: Asset; index: number }) => (
            <Image
                key={index + photo.id + photo.uri}
                placeholder={PLACEHOLDER}
                placeholderContentFit="contain"
                style={{ width, height }}
                source={{
                    uri: photo.uri,
                }}
            />
        ),
        [width, height]
    );


    const flatListKeyExtractor = useCallback((item: Asset) => item.id, []);

    // Функція рендеру SectionList
    const renderSectionList = useCallback(
        ({ item }: { item: { list: Asset[] } }) => (
            <FlatList
                removeClippedSubviews
                numColumns={totalColumns}
                columnWrapperStyle={{
                    gap: 1,
                }}
                key={totalColumns}
                data={item.list}
                renderItem={renderFlatListImage}
                keyExtractor={flatListKeyExtractor}
                ItemSeparatorComponent={() => <View style={{ height: SEPARATOR_HEIGHT }} />}
                getItemLayout={(_, index) => ({
                    length: height + SEPARATOR_HEIGHT,
                    offset: index * (height + SEPARATOR_HEIGHT),
                    index,
                })}
            />
        ),
        [totalColumns, renderFlatListImage, height, flatListKeyExtractor]
    );

    const sectionListKeyExtractor = useCallback(
        (item: { list: Asset[] }, id: number) => id + item.list[0].id,
        []
    );

    const renderSectionHeader = useCallback(
        ({ section: { title } }: { section: { title: string } }) => (
            <Text style={{ color: '#eee', fontSize: 16 }}>{title}</Text>
        ),
        []
    );

    return {
        renderSectionList,
        sectionListKeyExtractor,
        renderSectionHeader,
    };
};

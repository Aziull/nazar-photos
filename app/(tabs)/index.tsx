import { useAssets } from '@/hooks/useAssets';
import { useColumns } from '@/hooks/useColums';
import { Image } from 'expo-image';
import * as MediaLibrary from 'expo-media-library';
import { useMemo } from "react";
import { FlatList, SectionList, StyleSheet, Text, View } from "react-native";

const PLACEHOLDER = require('@/assets/images/placeholder-rect.png')
export default function PhotosScreen() {
  const { assets, loadMoreAssets } = useAssets()
  const { width, height, totalColumns } = useColumns()

  if (!assets) {
    return (
      <View>
        <Text>No Data Yet</Text>
      </View>
    )
  }
  const groupByDate = useMemo(() => {
    return Object.entries(
      assets.reduce<Record<string, MediaLibrary.Asset[]>>((acc, photo) => {
        const day = new Date(photo.creationTime)
        const dayLabel = new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' }).format(day);
        if (!acc[dayLabel]) {
          acc[dayLabel] = [];
        }
        acc[dayLabel].push(photo);
        return acc
      }, {})
    ).map(([day, photos]) => ({ title: day, data: [{ list: photos }] }))
  }, [assets])

  return (
    <View style={styles.container}>
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
        sections={groupByDate}
        keyExtractor={(item, id) => id + item.list[0].id}
        renderItem={({ item }) => (

          <FlatList
            removeClippedSubviews
            numColumns={totalColumns}
            columnWrapperStyle={{
              gap: 1
            }}
            key={totalColumns}
            data={item.list}
            renderItem={({ item: photo, index }) => (
              <Image
                key={index + photo.id + photo.uri}
                placeholder={PLACEHOLDER}
                placeholderContentFit='contain'
                style={{ width, height }}
                source={{
                  uri: photo.uri,
                }}
              />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
            getItemLayout={(_, index) => (
              { length: height, offset: height * index, index }
            )}
          />

        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{
            color: '#eee',
            fontSize: 16,
          }} >{title}</Text>
        )}
      />

    </View>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 60
  },
  text: {
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  gridItem: {
    aspectRatio: 1, // Зробити елемент квадратним
    backgroundColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
  },
})
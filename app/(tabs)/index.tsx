import * as MediaLibrary from 'expo-media-library';
import { useEffect, useMemo, useState } from "react";
import { Dimensions, FlatList, Image, SectionList, StyleSheet, Text, View } from "react-native";
const NUM_COLUMNS = 4; // Кількість стовпців у гріді
const { width } = Dimensions.get('window');
export default function PhotosScreen() {
  const [assets, setAssests] = useState<MediaLibrary.Asset[]>([]);
  const [status, requestPermission] = MediaLibrary.usePermissions();


  useEffect(() => {
    const loadPhotos = async () => {
      if (status === null) {
        await requestPermission();
      }
      try {
        const result = await MediaLibrary.getAssetsAsync({
          first: 300,
          sortBy: 'creationTime',
          mediaType: ['photo', 'video']
        })
        const { assets, ...info } = result
        // console.log(result)
        setAssests(assets)
      } catch (e) {
        alert('error')
      }

    }
    loadPhotos()
  }, [status])

  const photos = assets
  if (!photos) {
    return (
      <View>
        <Text>No Data Yet</Text>
      </View>
    )
  }
  const groupByDate = useMemo(() => {
    return Object.entries(
      photos.reduce<Record<string, MediaLibrary.Asset[]>>((acc, photo) => {
        const day = new Date(photo.creationTime)
        const dayLabel = new Intl.DateTimeFormat('uk-UA', { day: 'numeric', month: 'short', year: 'numeric' }).format(day);
        if (!acc[dayLabel]) {
          acc[dayLabel] = [];
        }
        acc[dayLabel].push(photo);
        return acc
      }, {})
    ).map(([day, photos]) => ({ title: day, data: [{ list: photos }] }))
  }, [photos])

  return (
    <View style={styles.container}>
      <SectionList
        style={{
          flex: 1,
          width: '100%',
        }}
        contentContainerStyle={{
          gap: 10
        }}
        sections={groupByDate}
        keyExtractor={(item) => item.list[0].id}
        renderItem={({ item }) => (

          <FlatList
            // contentContainerStyle={{ flexDirection: "row", flexWrap: 'wrap', gap: 1 }}
            numColumns={NUM_COLUMNS}
            columnWrapperStyle={{
              gap: 1
            }}
            key={NUM_COLUMNS}
            data={item.list}
            renderItem={({ item: photo }) => (
              <Image key={photo.id + photo.uri} style={{ width: width / NUM_COLUMNS, height: width / NUM_COLUMNS }} source={{ uri: photo.uri }} />
            )}
            keyExtractor={(item) => item.id}
            ItemSeparatorComponent={() => <View style={{ height: 1 }} />}
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
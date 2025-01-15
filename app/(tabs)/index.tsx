import PhotosList from '@/components/PhotosList';
import { useAssets } from '@/hooks/useAssets';
import { Section } from '@/types';
import * as MediaLibrary from 'expo-media-library';
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PhotosScreen() {
  const { assets, loadMoreAssets } = useAssets()

  if (!assets) {
    return (
      <View>
        <Text>No Data Yet</Text>
      </View>
    )
  }
  const groupByDate: Section[] = useMemo(() => {
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
      <PhotosList loadMoreAssets={loadMoreAssets} sections={groupByDate} />
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
})
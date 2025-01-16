import PhotosList from '@/components/PhotosList';
import ProgressBar from '@/components/ProgressBar';
import Show from '@/components/Show';
import { useAssets } from '@/hooks/useAssets';
import { Section } from '@/types';
import * as MediaLibrary from 'expo-media-library';
import { useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

export default function PhotosScreen() {
  const { assets, totalCount } = useAssets()
  const isLoading = Boolean(assets.length !== totalCount)
  const groupByDate: Section[] | undefined = useMemo(() => {
    if (isLoading) return
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

  //TODO: remove ProgressBar when assets loading will be faster
  return (
    <View style={styles.container}>
      <Show when={isLoading}>
        <ProgressBar processed={assets.length} total={totalCount || 0} style={{
          width: '80%'
        }} />
      </Show>
      <Show when={Boolean(groupByDate)}>
        <PhotosList sections={groupByDate!} />
      </Show>
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
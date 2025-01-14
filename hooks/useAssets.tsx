import * as MediaLibrary from 'expo-media-library';
import { useCallback, useEffect, useMemo, useState } from 'react';
export const useAssets = () => {
    const [assets, setAssests] = useState<MediaLibrary.Asset[]>([]);
    const [pagedInfo, setPagedInfo] = useState<Omit<MediaLibrary.PagedInfo<MediaLibrary.Asset>, 'assets'> | null>(null)
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const loadMoreAssets = useCallback(async () => {
        if (!status?.granted) return
        try {
            if (pagedInfo && !pagedInfo.hasNextPage) return

            const result = await MediaLibrary.getAssetsAsync({
                after: pagedInfo?.endCursor,

                first: 300,
                sortBy: 'creationTime',
                mediaType: ['photo', 'video']
            })
            const { assets, ...info } = result
            setAssests((prev) => ([...prev, ...assets]))
            setPagedInfo(info)
        } catch (e) {
            alert('error')
        }

    }, [status, pagedInfo])
    useEffect(() => {
        const grage = async () => {
            if (status === null) {
                await requestPermission();
            }
        }
        grage()
        loadMoreAssets()
    }, [loadMoreAssets])

    return {
        assets,
        loadMoreAssets
    }
}
import * as MediaLibrary from 'expo-media-library';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
export const useAssets = () => {
    const [assets, setAssests] = useState<MediaLibrary.Asset[]>([]);
    const [pagedInfo, setPagedInfo] = useState<Omit<MediaLibrary.PagedInfo<MediaLibrary.Asset>, 'assets'> | null>(null)
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const isLoading = useRef(false);
    const loadMoreAssets = useCallback(async (cursor?: string) => {
        if (isLoading.current) return;
        isLoading.current = true;
        try {
            const result = await MediaLibrary.getAssetsAsync({
                sortBy: 'creationTime',
                mediaType: ['photo', 'video'],
                after: cursor
            })
            const { assets, ...info } = result
            setAssests((prev) => ([...prev, ...assets]))
            setPagedInfo(info)
            if (info.hasNextPage) {
                return info.endCursor
            } else {
                return undefined
            }
        } catch (e) {
            alert('error')
        } finally {
            isLoading.current = false
        }

    }, [])

    const loadAllAssets = useCallback(async (cursor?: string) => {
        const nextCursor = await loadMoreAssets(cursor);
        if (nextCursor) {
            await loadAllAssets(nextCursor)
        }

    }, [loadMoreAssets])

    useEffect(() => {
        if (status?.granted) {
            loadAllAssets(undefined);
        } else if (status === null) {
            requestPermission();
        }
    }, [status, loadAllAssets]);
    return {
        assets,
        pagedInfo
    }
}
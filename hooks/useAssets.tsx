import * as MediaLibrary from 'expo-media-library';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

export const useAssets = () => {
    const [assets, setAssests] = useState<MediaLibrary.Asset[]>([]);
    const [totalCount, setTotalCount] = useState<number | undefined>(undefined)
    const [status, requestPermission] = MediaLibrary.usePermissions();
    const isLoading = useRef(false);
    const loadMoreAssets = useCallback(async (cursor?: string) => {
        if (isLoading.current) return;
        isLoading.current = true;
        try {
            const start = performance.now()
            const result = await MediaLibrary.getAssetsAsync({
                sortBy: 'creationTime',
                mediaType: ['video', 'photo'],
                after: cursor
            })
            const end = performance.now();
            console.log(`Виконання зайняло ${end - start} мс`);
            const { assets, ...info } = result
            setAssests((prev) => ([...prev, ...assets]))
            setTotalCount(info.totalCount)
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
        if (!cursor) {
            setTotalCount(0);
        }
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
        totalCount
    }
}
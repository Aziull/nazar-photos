import { Asset } from "expo-media-library";

export interface Section {
    title: string;
    data: {
        list: Asset[];
    }[];

}
declare module 'dom-to-image';
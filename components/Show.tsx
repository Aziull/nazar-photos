import { PropsWithChildren } from "react";

interface Props extends PropsWithChildren {
    when: boolean,

}
export default function Show({ when, children }: Props) {
    return when ? <>{children}</> : null;
}
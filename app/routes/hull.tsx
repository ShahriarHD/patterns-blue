import { useEffect } from "react";
import { Outlet } from "remix";
import { useLayoutContext } from "~/components/Layout";

export default function HullLayout() {

    return <Outlet />
};

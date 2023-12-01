import {useLocation} from "react-router-dom";
import {useMemo} from "react";

export function useSearchQuery() {
    const {search} = useLocation();
    return useMemo(() => new URLSearchParams(search), [search]);
}

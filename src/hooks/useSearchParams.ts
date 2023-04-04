import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useSearchParams = () => {
    const { search } = useLocation();

    return useMemo(() => new URLSearchParams(search), [search]);
};

// import { useNavigate } from "react-router-dom";

// export const useHistorySearch = () => {
//     const navigate = useNavigate();

//     return (pathname:any, params:any, state:any) => {
//         //params string or object
//         navigate({
//             pathname,
//             search: new URLSearchParams(params).toString(),
//         });
//     }
// };
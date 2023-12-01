import React, {FC} from 'react';
import twFocusClass from "../../utils/twFocusClass";
import {Link} from "react-router-dom";


export interface PaginationProps {
    className?: string;
    meta?: any;
}

const SearchPagePagination: FC<PaginationProps> = ({className = "", meta}) => {
    const url = window.location.href.replace(window.location.origin, "");
    const newUrl = url.replace(url.split("&").filter((item) => item.includes("page="))[0], "");

    const renderPagination = (pages: string, selectedPage: string) => {
        let currentPage = parseInt(selectedPage) + 1;
        let pagination = [];
        let start: number = currentPage - 2 < 1 ? 1 : currentPage - 2
        let limit: number = parseInt(pages) <= 4 ? parseInt(pages) : currentPage + 2;
        if (limit > parseInt(pages)) {
            start = start - (limit - parseInt(pages));
            limit = parseInt(pages);
        }
        for (let i = start; i <= limit; i++) {
            pagination.push(
                <Link
                    key={i}
                    className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()}`}
                    to={`${newUrl}page=${i}`}
                >
                    {
                        i === currentPage ?
                            <span
                                key={i}
                                className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-primary-6000 text-white ${twFocusClass()}`}
                            >
                                {i}
                            </span> : i
                    }
                </Link>
            )
        }
        return pagination;
    }

    return (
        <nav className={`nc-Pagination inline-flex space-x-1 text-base font-medium ${className}`}>
            <Link
                className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()} ${parseInt(meta?.currentPage) === 1 ? "hidden" : ""}`}
                to={`${newUrl}page=${meta?.previousPage === "0" ? 1 : meta?.previousPage}`}
            >
                &#60;
            </Link>
            {renderPagination(meta?.totalPage, meta?.currentPage)}
            <Link
                className={`inline-flex w-11 h-11 items-center justify-center rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 text-neutral-6000 dark:text-neutral-400 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:border-neutral-700 ${twFocusClass()} ${parseInt(meta?.currentPage) < parseInt(meta?.totalPage) ? "" : "hidden"}`}
                to={`${newUrl}page=${meta?.nextPage}`}
            >
                &#62;
            </Link>
        </nav>
    );
};

export default SearchPagePagination;

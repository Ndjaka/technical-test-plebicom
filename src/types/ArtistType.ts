
 export interface Artists {
    pagination: Pagination;
    data:       Artist[];
}


 export interface Artist {
    id:    number;
    title: string;
}


 export interface Pagination {
    total:        number;
    limit:        number;
    offset:       number;
    total_pages:  number;
    current_page: number;
    next_url:     string;
}




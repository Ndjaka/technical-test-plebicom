import { useEffect, useState } from "react";
import { Artist, Artists, Pagination } from "../types/ArtistType.ts";
import ArtistsService from "../service/ArtistsService";

interface UseArtistsOptions {
    page: number;
    perPage: number;
}

const useFetchArtists = (options: UseArtistsOptions) => {
    const [artists, setArtists] = useState<Artist[]>([]);
    const [pagination, setPagination] = useState<Pagination | undefined>();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchArtists = async () => {
            setIsLoading(true);
            setError(false);

            try {
                const response = await ArtistsService.getArtists(options.page, options.perPage);
                if (response.ok) {
                    const data: Artists = await response.json();
                    setArtists(data.data);
                    setPagination(data.pagination);
                } else {
                    setError(true);
                }
            } catch (error) {
                setError(true);
            } finally {
                setIsLoading(false);
            }
        };

        fetchArtists();
    }, [options.page, options.perPage]);

    return { artists, isLoading, error, pagination };
};

export default useFetchArtists;

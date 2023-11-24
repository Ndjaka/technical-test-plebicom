
const urls = {
    getArtists: (page : number , perPage:number) => `https://api.artic.edu/api/v1/artists?page=${page}&limit=${perPage}&fields=id,title`,
}

export default urls;
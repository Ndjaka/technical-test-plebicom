import urls from "./urls.ts";


class ArtistsService{

  static getArtists = ( page : number, perPage : number ): Promise<Response>  => {
      return fetch(urls.getArtists(page, perPage));
    }
}

export default ArtistsService;

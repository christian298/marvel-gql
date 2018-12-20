const { RESTDataSource } = require('apollo-datasource-rest');

class MarvelAPI extends RESTDataSource {
  constructor(config) {
    super();
    this.baseURL = 'https://gateway.marvel.com/';
    this.apiConfig = config;
  }

  willSendRequest(request) {
    request.params.set('ts', `${this.apiConfig.ts}`);
    request.params.set('apikey', process.env.PUBLIC_KEY);
    request.params.set('hash', `${this.apiConfig.hash}`);
  }

  async getCharacters() {
    const response = await this.get('v1/public/characters', null, { cacheOptions: { ttl: 60 } });
    return response.data.results;
  }

  async getCharacter(id) {
    const response = await this.get(`v1/public/characters/${id}`, null, {
      cacheOptions: { ttl: 60 }
    });
    return response.data.results[0];
  }

  async getComics() {
    const response = await this.get('v1/public/comics', null, { cacheOptions: { ttl: 60 } });
    return response.data.results;
  }

  async getComic(id) {
    const response = await this.get(`v1/public/comics/${id}`, null, { cacheOptions: { ttl: 60 } });
    return response.data.results[0];
  }
}

module.exports = MarvelAPI;

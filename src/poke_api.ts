import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  #cache = new Cache(60000);

  constructor() {}

  async catch(pokemon: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemon}`;

    const cached = this.#cache.get<Pokemon>(url);
    if (cached !== undefined)
      return cached;

    const response = await fetch(url);

    if (!response || !response.ok)
      throw new Error(`Resource couldn't be fetched`);

    const data: Pokemon = await response.json();

    this.#cache.add<Pokemon>(url, data);

    return data;
  }

  async explore(location: string): Promise<PokemonEncounter[]> {
    const url = `${PokeAPI.baseURL}/location-area/${location}`;

    const cached = this.#cache.get<PokemonEncounter[]>(url);
    if (cached !== undefined)
      return cached;

    const response = await fetch(url);

    if (!response || !response.ok)
      throw new Error(`Resource couldn't be fetched`);

    const data: LocationArea = await response.json();

    if (!data.pokemon_encounters)
      throw new Error(`Resource contains no encounters`);

    this.#cache.add<PokemonEncounter[]>(url, data.pokemon_encounters);

    return data.pokemon_encounters;
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    if (pageURL) {
      const cached = this.#cache.get<ShallowLocations>(pageURL);
      if (cached !== undefined)
        return cached;
    } 

    let response, url;
    
    if (!pageURL)
      url = `${PokeAPI.baseURL}/location-area`;
    else
      url = pageURL;

    response = await fetch(url)

    if (!response || !response.ok)
      throw new Error(`Resource couldn't be fetched`);

    const data: ShallowLocations = await response.json();

    this.#cache.add<ShallowLocations>(url, data);

    return data;
  }

  //async fetchLocation(locationName: string): Promise<Location> {
    // implement this
  //}
}

export type ShallowLocations = {
  count: number,
  next: string | null,
  previous: string | null,
  results: ShallowLocationDetails[],
};

export type ShallowLocationDetails = {
  name: string,
  url: string,
}

export type Region = {
  id: number,
  name: string,
  locations: Location[],
  names: string[],
};

export interface LocationArea {
  encounter_method_rates: EncounterMethodRate[]
  game_index: number
  id: number
  location: Location
  name: string
  names: Name[]
  pokemon_encounters: PokemonEncounter[]
};

export interface EncounterMethodRate {
  encounter_method: EncounterMethod
  version_details: VersionDetail[]
};

export interface EncounterMethod {
  name: string
  url: string
};

export interface VersionDetail {
  rate: number
  version: Version
};

export interface Version {
  name: string
  url: string
};

export interface Location {
  name: string
  url: string
};

export interface Name {
  language: Language
  name: string
};

export interface Language {
  name: string
  url: string
};

export interface PokemonEncounter {
  pokemon: Pokemon
  version_details: VersionDetail2[]
};

export interface Pokemon {
  name: string
  url: string
};

export interface VersionDetail2 {
  encounter_details: EncounterDetail[]
  max_chance: number
  version: Version2
};

export interface EncounterDetail {
  chance: number
  condition_values: any[]
  max_level: number
  method: Method
  min_level: number
};

export interface Method {
  name: string
  url: string
};

export interface Version2 {
  name: string
  url: string
};

export interface Pokemon {
  abilities: Ability[]
  base_experience: number
  cries: Cries
  forms: Form[]
  game_indices: Index[]
  height: number
  held_items: HeldItem[]
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Mfe[]
  name: string
  order: number
  past_abilities: PastAbility[]
  past_stats: PastStat[]
  past_types: any[]
  species: Species
  sprites: Sprites
  stats: Stat3[]
  types: Type[]
  weight: number
};

export interface Ability {
  ability: Ability2
  is_hidden: boolean
  slot: number
};

export interface Ability2 {
  name: string
  url: string
};

export interface Cries {
  latest: string
  legacy: string
};

export interface Form {
  name: string
  url: string
};

export interface Index {
  game_index: number
  version: Version
};

export interface Version {
  name: string
  url: string
};

export interface HeldItem {
  item: Item
  version_details: VersionDetail[]
};

export interface Item {
  name: string
  url: string
};

export interface VersionDetail {
  rarity: number
  version: Version2
};

export interface Version2 {
  name: string
  url: string
};

export interface Mfe {
  move: Move
  version_group_details: VersionGroupDetail[]
};

export interface Move {
  name: string
  url: string
};

export interface VersionGroupDetail {
  level_learned_at: number
  move_learn_method: MoveLearnMethod
  order?: number
  version_group: VersionGroup
};

export interface MoveLearnMethod {
  name: string
  url: string
};

export interface VersionGroup {
  name: string
  url: string
};

export interface PastAbility {
  abilities: Ability3[]
  generation: Generation
};

export interface Ability3 {
  ability: any
  is_hidden: boolean
  slot: number
};

export interface Generation {
  name: string
  url: string
};

export interface PastStat {
  generation: Generation2
  stats: Stat[]
};

export interface Generation2 {
  name: string
  url: string
};

export interface Stat {
  base_stat: number
  effort: number
  stat: Stat2
};

export interface Stat2 {
  name: string
  url: string
};

export interface Species {
  name: string
  url: string
};

export interface Sprites {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
  other: Other
  versions: Versions
};

export interface Other {
  dream_world: DreamWorld
  home: Home
  "official-artwork": OfficialArtwork
  showdown: Showdown
};

export interface DreamWorld {
  front_default: string
  front_female: any
};

export interface Home {
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface OfficialArtwork {
  front_default: string
  front_shiny: string
};

export interface Showdown {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: any
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface Versions {
  "generation-i": GenerationI
  "generation-ii": GenerationIi
  "generation-iii": GenerationIii
  "generation-iv": GenerationIv
  "generation-ix": GenerationIx
  "generation-v": GenerationV
  "generation-vi": GenerationVi
  "generation-vii": GenerationVii
  "generation-viii": GenerationViii
};

export interface GenerationI {
  "red-blue": RedBlue
  yellow: Yellow
};

export interface RedBlue {
  back_default: string
  back_gray: string
  back_transparent: string
  front_default: string
  front_gray: string
  front_transparent: string
};

export interface Yellow {
  back_default: string
  back_gray: string
  back_transparent: string
  front_default: string
  front_gray: string
  front_transparent: string
};

export interface GenerationIi {
  crystal: Crystal
  gold: Gold
  silver: Silver
};

export interface Crystal {
  back_default: string
  back_shiny: string
  back_shiny_transparent: string
  back_transparent: string
  front_default: string
  front_shiny: string
  front_shiny_transparent: string
  front_transparent: string
};

export interface Gold {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
  front_transparent: string
};

export interface Silver {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
  front_transparent: string
};

export interface GenerationIii {
  emerald: Emerald
  "firered-leafgreen": FireredLeafgreen
  "ruby-sapphire": RubySapphire
};

export interface Emerald {
  front_default: string
  front_shiny: string
};

export interface FireredLeafgreen {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
};

export interface RubySapphire {
  back_default: string
  back_shiny: string
  front_default: string
  front_shiny: string
};

export interface GenerationIv {
  "diamond-pearl": DiamondPearl
  "heartgold-soulsilver": HeartgoldSoulsilver
  platinum: Platinum
};

export interface DiamondPearl {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface HeartgoldSoulsilver {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface Platinum {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface GenerationIx {
  "scarlet-violet": ScarletViolet
};

export interface ScarletViolet {
  front_default: string
  front_female: any
};

export interface GenerationV {
  "black-white": BlackWhite
};

export interface BlackWhite {
  animated: Animated
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface Animated {
  back_default: string
  back_female: string
  back_shiny: string
  back_shiny_female: string
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface GenerationVi {
  "omegaruby-alphasapphire": OmegarubyAlphasapphire
  "x-y": XY
};

export interface OmegarubyAlphasapphire {
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface XY {
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface GenerationVii {
  icons: Icons
  "ultra-sun-ultra-moon": UltraSunUltraMoon
};

export interface Icons {
  front_default: string
  front_female: any
};

export interface UltraSunUltraMoon {
  front_default: string
  front_female: string
  front_shiny: string
  front_shiny_female: string
};

export interface GenerationViii {
  "brilliant-diamond-shining-pearl": BrilliantDiamondShiningPearl
  icons: Icons2
};

export interface BrilliantDiamondShiningPearl {
  front_default: string
  front_female: any
};

export interface Icons2 {
  front_default: string
  front_female: string
};

export interface Stat3 {
  base_stat: number
  effort: number
  stat: Stat4
};

export interface Stat4 {
  name: string
  url: string
};

export interface Type {
  slot: number
  type: Type2
};

export interface Type2 {
  name: string
  url: string
};
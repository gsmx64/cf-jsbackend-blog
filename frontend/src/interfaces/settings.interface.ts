export default interface ISettings {
  updateAt: string;
  brand: string;
  terms: string;
  facebook: string;
  instagram: string;
  twitterx: string;
  linkedin: string;
  youtube: string;
  tiktok: string;
  setup: number | null | undefined;
}

export const initISettings: ISettings = {
  updateAt: '',
  brand: '',
  terms: '',
  facebook: '',
  instagram: '',
  twitterx: '',
  linkedin: '',
  youtube: '',
  tiktok: '',
  setup: null
}
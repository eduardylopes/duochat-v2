const KEY_PREFIX_LOCAL = '@RealTimeChat-';

class LocalStorage {
  static get<T>(key: string, defaultValue?: T): T | undefined {
    const data = localStorage.getItem(KEY_PREFIX_LOCAL.concat(key));
    if (!data || data === 'undefined') return defaultValue;
    return JSON.parse(data);
  }

  static set = <T>(key: string, value: T) =>
    localStorage.setItem(KEY_PREFIX_LOCAL.concat(key), JSON.stringify(value));

  static remove = (key: string) =>
    localStorage.removeItem(KEY_PREFIX_LOCAL.concat(key));

  static clear = () => localStorage.clear();

  static getAll = (): { [key: string]: any } => {
    const localStorageObject: { [key: string]: any } = {};
    for (let x = 0; x < localStorage.length; x++) {
      const key = localStorage.key(x);
      if (key)
        localStorageObject[key.replace(KEY_PREFIX_LOCAL, '')] = JSON.parse(
          localStorage.getItem(key) as string
        );
    }

    return localStorageObject;
  };
}

export default LocalStorage;

const KEY_PREFIX_SESSION = '@RealTimeChat-';

class SessionStorage {
  static get<T>(key: string, defaultValue?: T): T | undefined {
    const data = sessionStorage.getItem(KEY_PREFIX_SESSION.concat(key));
    if (!data || data === 'undefined') return defaultValue;
    return JSON.parse(data);
  }

  static set = <T>(key: string, value: T) =>
    sessionStorage.setItem(
      KEY_PREFIX_SESSION.concat(key),
      JSON.stringify(value)
    );

  static remove = (key: string) =>
    sessionStorage.removeItem(KEY_PREFIX_SESSION.concat(key));

  static clear = () => sessionStorage.clear();

  static getAll = (): { [key: string]: any } => {
    const sessionStorageObject: { [key: string]: any } = {};
    for (let x = 0; x < sessionStorage.length; x++) {
      const key = sessionStorage.key(x);
      if (key)
        sessionStorageObject[key.replace(KEY_PREFIX_SESSION, '')] = JSON.parse(
          localStorage.getItem(key) as string
        );
    }

    return sessionStorageObject;
  };
}

export default SessionStorage;

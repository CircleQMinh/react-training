//setCookie("token", "my-access-token", 7);
export const SetCookie = (name: string, value: string, minutes?: number) => {
  let expires = "";
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = `${name}=${encodeURIComponent(value)}${expires}; path=/`;
};

export const GetCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    return match ? decodeURIComponent(match[2]) : null;
  };
  export const ClearCookie = (name:string) :void => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
export const themeStorageKey = "portfolio-theme";
export const themeOptions = ["light", "dark", "system"];

export const themeInitScript = `(function(){try{var key='${"portfolio-theme"}';var p=localStorage.getItem(key)||'system';var m=window.matchMedia('(prefers-color-scheme: dark)');var r=p==='system'?(m.matches?'dark':'light'):p;document.documentElement.dataset.theme=r;document.documentElement.dataset.themePreference=p;document.documentElement.style.colorScheme=r;}catch(e){}})();`;

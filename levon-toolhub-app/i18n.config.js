export const i18n = {
  defaultLocale: "en",
  locales: ["en", "zh-CN", "zh-TW", "ja", "ko", "es", "fr", "de"],
}

export const defaultNS = "common"

export function getOptions(locale = i18n.defaultLocale, ns = defaultNS) {
  return {
    supportedLngs: i18n.locales,
    fallbackLng: i18n.defaultLocale,
    lng: locale,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  }
}

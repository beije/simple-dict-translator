# simple-dict-translator

A simple translation module which accepts locale's with dictionary mappings.

The translator supports a current locale and a fallback locale. If a translation key does not match either the current or the fallback, the key itself will be returned.

The module exposes three things:

1. a singleton class which you can load in your dictionaries and your locales.
2. A short-hand translate method (connected to the singleton class)
3. The class constructor, if you want/need to create your own translator instance.

`import {translator, translate, Translator} from 'simple-dict-translator'`

## Usage

See `/example/index.js` for how to use the translator.

```/**
 * Adds a new translation to the translator.
 *
 * @param {string} locale           The locale for the translation.
 * @param {object} translationDict  The dictionary for the translation.
 * @param {bool}   isCurrent        [Optional] if the language is the current language.
 */
translator.addTranslation(locale, translationDict, isCurrent);

/**
 * Removes a translation from the translator
 *
 * @param {string} locale           The locale for the translation.
 */
translator.removeTranslation(locale);

/**
 * Normalizes a locale (i.e. all locales should be lowercase with underscore 
 * separating language and country, e.g. en_us, en_gb, sv_se, de_de, etc).
 *
 * @param {string}  locale  The locale for the translation (en-US).
 *
 * @return {string}         The normalized locale
 */
translator.normalizeLocale(locale);

/**
 * Sets the new current locale for the translator to use.
 *
 * @param {string}  locale  The new current locale.
 */
translator.setCurrentLocale(locale);

/**
 * Returns the current locale
 *
 * @param {string}  locale  The new current locale.
 */
translator.getCurrentLocale();

/**
 * Sets the new fallback locale for the translator to use.
 *
 * @param {string}  locale  The fallback locale.
 */
translator.setFallbackLocale(locale);

/**
 * Returns the fallback locale
 *
 * @param {string}  locale  The new fallback locale.
 */
translator.getFallbackLocale();

/**
 * Returns the closest matching locale based on language.
 * First it'll try to see if it supports the locale as is,
 * if not, it'll try to find a locale with the same language support (i.e. en-us == en-gb)
 * and if no match was found, the fallback locale will be returned.
 *
 * @param {string}  locale  The locale to find a match for.
 *
 * @return {string}  The result
 */
translator.getClosestLocale(locale);

/**
 * Translates a key to the current language (or overriding language).
 *
 * @param {string} key      The translation/dictionary key
 * @param {string} locale   [Optional] Overriding locale
 * @return {string}         The translated string
 */
translator.translate(key, locale);```


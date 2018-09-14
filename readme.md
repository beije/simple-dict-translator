# simple-dict-translator

A simple translation module which accepts locales with dictionary mappings.

The translator supports a current locale and a fallback locale. If a translation key does not match either the current or the fallback, the key itself will be returned.

The module exposes three things:

1. a singleton class which you can load in your dictionaries and your locales.
2. A short-hand translate method (connected to the singleton class)
3. The class constructor, if you want/need to create your own translator instance.

`import {translator, translate, Translator} from 'simple-dict-translator'`

## Usage

See [example/index.js](https://github.com/beije/simple-dict-translator/blob/master/example/index.js) for how to use the translator.

    var translator = require("simple-dict-translator").translator;
    var translate = require("simple-dict-translator").translate;

    var englishTranslations = {
        'hi':           'Hi',
        'welcome':      'Welcome'
    };
    var swedishTranslations = {
        'hi':           'Hej',
        'welcome':      'Välkommen',
        'translation':  'Översättning',
    };
    var germanTranslations = {
        'hi':           'Hallo',
        'welcome':      'Willkommen',
        'translation':  'Übersetzung',
    };

    translator.addTranslation('en_us', englishTranslations);
    translator.addTranslation('sv_se', swedishTranslations);
    translator.addTranslation('de_de', germanTranslations);

    translator.setCurrentLocale('sv_se'); // Current language
    translator.setFallbackLocale('en_us'); // Fallback language if current language is missing the translation

    translate('hi'); // Hej 
    translate('hi', 'de_de'); // Hallo
    translator.setCurrentLocale('en_us'); // Change current language to English
    translator.setFallbackLocale('de_de'); // Change Fallback language to German
    translate('hi'); // Hi
    translate('translation'); // Übersetzung - (The English translation is missing the "translation" key, fallback is used)


## Methods

These are the available methods for the translator object.

    /**
     * Checks if translator supports locale
     *
     * @param {string} locale           The locale for the translation.
     * @param {bool}   true if translation for locale exists
     */
    translator.hasTranslation(locale);
    
    /**
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
     * @param {string} key       The translation/dictionary key
     * @param {string} locale    [Optional] Overriding locale
     * @param {string} fallback  [Optional] fallback string if no translation was found
     * @return {string}          The translated string
     */
    translate(key, locale, fallback)


class Translator {
    constructor() {
        this._supportedLocales = new Set();
        this._fallbackLocale = '';
        this._currentLocale = '';
        this._translations = {};
    }

    /**
     * Checks if translator supports locale
     *
     * @param {string} locale           The locale for the translation.
     * @param {bool}   true if translation for locale exists
     */
    hasTranslation(locale) {
        locale = this.normalizeLocale(locale);

        return this._supportedLocales.has(locale);
    }

    /**
     * Adds a new translation to the translator.
     *
     * @param {string} locale           The locale for the translation.
     * @param {object} translationDict  The dictionary for the translation.
     * @param {bool}   isCurrent        [Optional] if the language is the current language.
     */
    addTranslation(locale, translationDict, isCurrent) {
        locale = this.normalizeLocale(locale);

        this._supportedLocales.add(locale);
        this._translations[locale] = translationDict;

        if (isCurrent) {
            this.setCurrentLocale(locale);
        }
    }

    /**
     * Removes a translation from the translator
     *
     * @param {string} locale           The locale for the translation.
     */
    removeTranslation(locale) {
        locale = this.normalizeLocale(locale);

        this._supportedLocales.delete(locale);
        delete this._translations[locale];
    }

    /**
     * Normalizes a locale (i.e. all locales should be lowercase with underscore 
     * separating language and country, e.g. en_us, en_gb, sv_se, de_de, etc).
     *
     * @param {string}  locale  The locale for the translation (en-US).
     *
     * @return {string}         The normalized locale
     */
    normalizeLocale(locale)  {
        locale = ('' + locale).split('-').join('_');
    
        return locale.toLowerCase();
    }

    /**
     * Sets the new current locale for the translator to use.
     *
     * @param {string}  locale  The new current locale.
     */
    setCurrentLocale(locale)  {
        locale = this.normalizeLocale(locale)
        if (locale && this._translations[locale]) {
            this._currentLocale = locale;
        }
    }

    /**
     * Returns the current locale
     *
     * @param {string}  locale  The new current locale.
     */
    getCurrentLocale()  {
        return this._currentLocale;
    }

    /**
     * Sets the new fallback locale for the translator to use.
     *
     * @param {string}  locale  The fallback locale.
     */
    setFallbackLocale(locale)  {
        locale = this.normalizeLocale(locale)
        if (locale && this._translations[locale]) {
            this._fallbackLocale = locale;
        }
    }

    /**
     * Returns the fallback locale
     *
     * @param {string}  locale  The new fallback locale.
     */
    getFallbackLocale()  {
        return this._fallbackLocale;
    }

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
    getClosestLocale(locale)  {
        locale = this.normalizeLocale(locale);

        if(this._supportedLocales.has(locale)) {
            return locale;
        }
    
        locale = locale.split('_');
        let requestLanguage = locale[0];
        let requestCountry = (locale.length > 1 ? locale[1] : null);
        let closest = false;
    
        this._supportedLocales.forEach(supportedCode => {
            let supportedCodeParts = supportedCode.split('_');
            if (requestLanguage == supportedCodeParts[0]) {
                closest = supportedCode;
            }
        });
        
        if (!closest) {
            closest = this._fallbackLocale;
        }
    
        return closest;
    }

    /**
     * Translates a key to the current language (or overriding language).
     *
     * @param {string} key       The translation/dictionary key
     * @param {string} locale    [Optional] Overriding locale
     * @param {string} fallback  [Optional] fallback string if no translation was found
     * @return {string}          The translated string
     */
    translate(key, locale, fallback)  {
        let translation = '';

        locale = this.normalizeLocale(locale);

        if (!key) {
            throw new Error('Translation key must be specified!')
        }
    
        if (!locale) {
            locale = this._currentLocale;
        }
    
        if (this._fallbackLocale && this._translations[this._fallbackLocale] && this._translations[this._fallbackLocale][key]) {
            translation = this._translations[this._fallbackLocale][key];
        }
    
        if (this._currentLocale && this._translations[this._currentLocale] && this._translations[this._currentLocale][key]) {
            translation = this._translations[this._currentLocale][key];
        }
    
        if (locale && this._translations[locale] && this._translations[locale][key]) {
            translation = this._translations[locale][key];
        }
    
        if (translation === '') {
            translation = key;

            if (fallback) {
                translation = fallback;
            }
        }
    
        return translation;
    }
}


export default Translator;
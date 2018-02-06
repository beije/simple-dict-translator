import translations from './translations';
import {translate, translator} from '../index.js';

// Load locales and dictionaries
Object.keys(translations).forEach(function(key) {
    translator.addTranslation(key, translations[key]);
});

// Set current and fallback locales
translator.setCurrentLocale('en_us');
translator.setFallbackLocale('en_us');

//
// Translate
//

console.log('Default', translator.translate('welcome')); // Welcome
console.log('en_us', translator.translate('welcome', 'en_us')); // Welcome
console.log('sv_se', translator.translate('welcome', 'sv_se')); // Välkommen
console.log('de_de', translator.translate('welcome', 'de_de')); // Willkommen

translator.setCurrentLocale('sv_se');
console.log('New default', translator.translate('welcome')); // Välkommen
console.log('Fallback', translator.translate('only_in_english')); // Only in English
console.log('No translation', translator.translate('no_translation')); // no_translation

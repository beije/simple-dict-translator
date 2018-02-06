import Translator from '../src/Translator'
import {expect} from 'chai';

describe('translator', function () {
    let translator;

    beforeEach(function() {
        translator = new Translator();
    });

    describe('normalizeLocale', function () {
        it('should make text lowercase', function () {
            expect(translator.normalizeLocale('EN')).to.eql('en');
        });
        it('should replace hyphens with underscore', function () {
            expect(translator.normalizeLocale('en-US')).to.eql('en_us');
        });
    });

    describe('translations', function () {
        let en_locale = 'en_us';
        let en_dict = {'welcome': 'Welcome'};

        let sv_locale = 'sv_se';
        let sv_dict = {'welcome': 'Välkommen'};

        let de_locale = 'de_de';
        let de_dict = {'welcome': 'Willkommen', 'goodbye': 'Auf Wiedersehen'};

        describe('add', function () {
            let locale = sv_locale;
            let dict = sv_dict;


            it('should add translations to supported translations', function () {
                translator.addTranslation(locale, dict);

                expect(translator.translate('welcome', locale)).to.eql(dict.welcome);
            });

            it('should set default translation when adding translation', function () {
                translator.addTranslation(locale, dict, true);
                expect(translator.translate('welcome')).to.eql(dict.welcome);
            });

            it('should remove translations to supported translations', function () {
                translator.addTranslation(locale, dict);

                translator.removeTranslation(locale);
                expect(translator.translate('welcome', locale)).to.eql('welcome');
            });


        });
        describe('locales', function () {
            beforeEach(function() {
                translator.addTranslation(en_locale, en_dict, true);
                translator.addTranslation(sv_locale, sv_dict);
            });

            it('should be able to set/get current locale', function () {
                translator.setCurrentLocale(sv_locale);
                expect(translator.getCurrentLocale()).to.eql(sv_locale);
            });

            it('should be able to set/get fallback locale', function () {
                translator.setFallbackLocale(sv_locale);
                expect(translator.getFallbackLocale()).to.eql(sv_locale);
            });
        });

        describe('getClosestLocale', function () {
            beforeEach(function() {
                translator.addTranslation(en_locale, en_dict);
                translator.addTranslation(sv_locale, sv_dict);
                translator.addTranslation(de_locale, de_dict);
                translator.setCurrentLocale(en_locale);
                translator.setFallbackLocale(de_locale);
            });

            it('should return locale if locale is supported', function () {
                expect(translator.getClosestLocale(en_locale)).to.eql(en_locale);
            })
            it('should return same language locale if no country is matched', function () {
                expect(translator.getClosestLocale('en_gb')).to.eql(en_locale);
            })
            it('should return fallback if no match is found', function () {
                expect(translator.getClosestLocale('fr_fr')).to.eql(de_locale);
            })
            it('should normalize given locale, and return same', function () {
                expect(translator.getClosestLocale('En-uS')).to.eql(en_locale);
            })

        });
        describe('translate', function () {
            beforeEach(function() {
                translator.addTranslation(en_locale, en_dict);
                translator.addTranslation(sv_locale, sv_dict);
                translator.addTranslation(de_locale, de_dict);
                translator.setCurrentLocale(en_locale);
                translator.setFallbackLocale(de_locale);
            });

            it('should be able to translate current locale', function () {
                expect(translator.translate('welcome')).to.eql(en_dict.welcome);
            })
            it('should be able to translate given locale', function () {
                expect(translator.translate('welcome', sv_locale)).to.eql(sv_dict.welcome);
            })
            it('should be able to translate and go to fallback locale', function () {
                expect(translator.translate('goodbye')).to.eql(de_dict.goodbye);
            })
            it('should be able to translate and give key if no matching translation was found', function () {
                expect(translator.translate('hello')).to.eql('hello');
            })
            it('should throw error if no key is given', function () {
                expect(translator.translate).to.throw();
            })


        })
    })

});
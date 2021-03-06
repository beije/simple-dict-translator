import Translator from '../src/Translator';
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

    describe('translation', function () {
        let en_locale = 'en_us';
        let en_dict = {'welcome': 'Welcome'};

        let sv_locale = 'sv_se';
        let sv_dict = {'welcome': 'Välkommen'};

        let de_locale = 'de_de';
        let de_dict = {'welcome': 'Willkommen', 'goodbye': 'Auf Wiedersehen'};

        describe('dictionaries', function () {
            let locale = sv_locale;
            let dict = sv_dict;



            describe('which does not exist', function () {
                it('should be marked as non supported', function () {    
                    expect(translator.hasTranslation(locale)).to.eql(false);
                });
            })

            describe('when added', function () {
                describe('as non current', function () {
                    beforeEach(function() {
                        translator.addTranslation(locale, dict);
                    });

                    it('should be added as supported', function () {    
                        expect(translator.hasTranslation(locale)).to.eql(true);
                    });

                    it('should translate correctly', function () {    
                        expect(translator.translate('welcome', locale)).to.eql('Välkommen');
                    });

                    it('should not become current translation', function () {
                        expect(translator.translate('welcome')).to.not.eql('Welcome');
                    });
                });

                describe('as current', function () {
                    beforeEach(function() {
                        translator.addTranslation(locale, dict, true);
                    });

                    it('should be added as supported', function () {    
                        expect(translator.hasTranslation(locale)).to.eql(true);
                    });

                    it('should become current translation', function () {
                        expect(translator.getCurrentLocale()).to.eql(locale);
                    });
                });

                describe('and then removed', function () {
                    beforeEach(function() {
                        translator.addTranslation(locale, dict);
                        translator.removeTranslation(locale);
                    });

                    it('should be removed', function () {    
                        expect(translator.hasTranslation(locale)).to.eql(false);
                    });
                });
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
                    expect(translator.translate('welcome')).to.eql('Welcome');
                })
                it('should be able to translate given locale', function () {
                    expect(translator.translate('welcome', sv_locale)).to.eql('Välkommen');
                })
                it('should be able to translate and go to fallback locale', function () {
                    expect(translator.translate('goodbye')).to.eql('Auf Wiedersehen');
                })
                it('should be able to translate and give key if no matching translation was found', function () {
                    expect(translator.translate('hello')).to.eql('hello');
                })
                describe('should be able to translate and when fallback', function () {
                    it('is set to something', function () {
                        expect(translator.translate('hello', false, 'Hej')).to.eql('Hej');
                    })
                    it('is empty string', function () {
                        expect(translator.translate('hello', false, '')).to.eql('');
                    })
                    it('is false', function () {
                        expect(translator.translate('hello', false, false)).to.eql(false);
                    })
                });

                it('should be able to translate and give key if fallback is undefined', function () {
                    expect(translator.translate('hello', false, undefined)).to.eql('hello');
                })

                it('should throw error if no key is given', function () {
                    expect(translator.translate).to.throw();
                })
            })
        });
        describe('locales', function () {
            beforeEach(function() {
                translator.addTranslation(en_locale, en_dict, true);
                translator.addTranslation(sv_locale, sv_dict);
            });

            it('should be able to set/get current locale', function () {
                translator.setCurrentLocale('sv_se');
                expect(translator.getCurrentLocale()).to.eql('sv_se');
            });

            it('should be able to set/get fallback locale', function () {
                translator.setFallbackLocale('sv_se');
                expect(translator.getFallbackLocale()).to.eql('sv_se');
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
                expect(translator.getClosestLocale(en_locale)).to.eql('en_us');
            })
            it('should return same language locale if no country is matched', function () {
                expect(translator.getClosestLocale('en_gb')).to.eql('en_us');
            })
            it('should return fallback if no match is found', function () {
                expect(translator.getClosestLocale('fr_fr')).to.eql('de_de');
            })
            it('should normalize given locale, and return same', function () {
                expect(translator.getClosestLocale('En-uS')).to.eql('en_us');
            })

        });
    })

});
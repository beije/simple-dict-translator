import Translator from './Translator';

const translator = new Translator();

const api = {
    translator: translator,
    Translator: Translator,
    translate: translator.translate.bind(translator)
};

module.exports = api;
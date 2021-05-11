class SigningBox {
    constructor(client, {dictionary, wordCount, seedPhrase, hdPath} = {}) {
        this.client = client;
        this.dictionary = dictionary;
        this.wordCount = wordCount;
        this.seedPhrase = seedPhrase;
        this.hdPath = hdPath;
    }

    async ensureKeys() {
        if (!this.keys) {
            this.keys = (await this.client.crypto.mnemonic_derive_sign_keys({
                dictionary: this.dictionary,
                word_count: this.wordCount,
                phrase: this.seedPhrase,
                path: this.hdPath,
            }));
        }
        return this.keys;
    }

    async get_public_key() {
        return {
            public_key: (await this.ensureKeys()).public,
        };
    }

    async sign(params) {
        return (await this.client.crypto.sign({
            keys: await this.ensureKeys(),
            unsigned: params.unsigned,
        }));
    }
}

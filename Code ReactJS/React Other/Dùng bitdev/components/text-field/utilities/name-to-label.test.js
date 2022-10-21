import * as React from 'react';

import { nameToLabel } from './';

describe('nameToLabel', () => {
    // it('should throw an error when empty object is passed', () => {
    //     // $FlowFixMe
    //     expect(() => nameToLabel({})).toThrow();
    // });
    // it('should throw an error when null is passed', () => {
    //     // $FlowFixMe
    //     expect(() => nameToLabel(null)).toThrow();
    // });
    // it('should throw an error when undefined is passed', () => {
    //     // $FlowFixMe
    //     expect(() => nameToLabel(undefined)).toThrow();
    // });
    // it('should throw an error when empty string is passed', () => {
    //     // $FlowFixMe
    //     expect(() => nameToLabel('')).toThrow();
    // });
    // it('should throw an error when non empty string is passed', () => {
    //     // $FlowFixMe
    //     expect(() => nameToLabel('asd')).toThrow();
    // });
    it('should throw an error when empty name is passed', () => {
        expect(() => nameToLabel({ name: '' })).toThrow();
    });
    it('should throw an error when whitespace name is passed', () => {
        expect(() => nameToLabel({ name: '\r\n\t ' })).toThrow();
    });
    describe('name', () => {
        it('should capitalise the first letter if only one word is passed in', () => {
            expect(nameToLabel({ name: 'bob' })).toEqual('Bob');
        });
        it('should capitalise the first letter of each word and add a space if camel case string is passed in', () => {
            expect(nameToLabel({ name: 'bobBobson' })).toEqual('Bob Bobson');
        });
        it('should capitalise the first letter of each word and add a space if pascal case string is passed in', () => {
            expect(nameToLabel({ name: 'BobBobson' })).toEqual('Bob Bobson');
        });
        it('should capitalise the first letter of each word and add a space if snake case string is passed in', () => {
            expect(nameToLabel({ name: 'bob_bobson' })).toEqual('Bob Bobson');
        });
        it('should capitalise the first letter of each word and add a space if kebab case string is passed in', () => {
            expect(nameToLabel({ name: 'bob-bobson' })).toEqual('Bob Bobson');
        });
        it("should add an 's if a word that is not the last word ends in an s", () => {
            expect(nameToLabel({ name: 'bobsBobson' })).toEqual("Bob's Bobson");
        });
        it("should not add an 's if a word that is the last word ends in an s", () => {
            expect(nameToLabel({ name: 'bobBobsons' })).toEqual('Bob Bobsons');
        });
        it("should not add an 's for the word reasons", () => {
            expect(nameToLabel({ name: 'reasons' })).toEqual('Reasons');
        });
    });
    describe('label', () => {
        it('should use the name if label is not provided', () => {
            expect(nameToLabel({ name: 'asd' })).toEqual('Asd');
        });
        it('should use the name if label is null', () => {
            expect(nameToLabel({ name: 'asd', label: null })).toEqual('Asd');
        });
        it('should use the name if label is undefined', () => {
            expect(nameToLabel({ name: 'asd', label: undefined })).toEqual('Asd');
        });
        it('should use the name if label is just whitespace', () => {
            expect(nameToLabel({ name: 'asd', label: '\r\n\t ' })).toEqual('Asd');
        });
        it('should use the label as is if one is set', () => {
            expect(nameToLabel({ name: 'asd', label: 'bobBobson' })).toEqual('bobBobson');
        });
        it('should trim the label if starts with or ends with whitespace', () => {
            expect(nameToLabel({ name: 'asd', label: 'bobBobson\n\t ' })).toEqual('bobBobson');
        });
        it('should use the label if it is a react node', () => {
            const reactNode = <span>hi</span>;
            expect(nameToLabel({ name: 'asd', label: reactNode })).toEqual(reactNode);
        });
    });
    describe('prefix', () => {
        it('should add the prefix at the beginning of the string if one is provided', () => {
            expect(nameToLabel({ name: 'bob', prefix: 'Not ' })).toEqual('Not Bob');
        });
    });
    describe('suffix', () => {
        it('should add the prefix at the beginning of the string if one is provided', () => {
            expect(nameToLabel({ name: 'bob', suffix: '?' })).toEqual('Bob?');
        });
    });
    describe('repeated components where there is a dot in the name', () => {
        it('should not include the details before the last dot', () => {
            expect(nameToLabel({ name: 'doctors[0].postalCode' })).toEqual('Postal Code');
        });
        it('should not include the details before the last dot when there are multiple dots', () => {
            expect(nameToLabel({ name: 'doctors[0].a.b.c.d.postalCode' })).toEqual('Postal Code');
        });
    });
});

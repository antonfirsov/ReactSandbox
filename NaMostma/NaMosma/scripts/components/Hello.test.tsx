import * as React from 'react';
import TestUtils from 'react-addons-test-utils';

import * as enzyme from 'enzyme';
import jasmineEnzyme from 'jasmine-enzyme';
import Hello from './Hello';

describe("Rezsi", () => {

        beforeEach(() => {
            jasmineEnzyme();
        });

        it('is always true', () => {
                expect(true);
            });
    });

//it('renders the correct text when no enthusiasm level is given', () => {
//    const hello = enzyme.shallow(<Hello name='Daniel' />);
//    expect(hello.find(".greeting").text()).toEqual('Hello Daniel!')
//});

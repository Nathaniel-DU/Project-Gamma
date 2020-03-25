import React from 'react';
import { shallow } from 'enzyme';
import Hamburger from './index';

describe(`Hamburger`, () => {
    it(`should render correctly in "debug" mode`, () => {
        const component = shallow(<Hamburger debug />);
        expect(component).toMatchSnapshot();
    });
});
import React from 'react';
import { shallow } from 'enzyme';
import Logout from './index';

describe(`Logout`, () => {
    it(`should render correctly in "debug" mode`, () => {
        const component = shallow(<Logout debug />);
        expect(component).toMatchSnapshot();
    });
});
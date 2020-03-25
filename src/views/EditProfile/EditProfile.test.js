import React from 'react';
import { shallow } from 'enzyme';
import EditProfile from './index';

describe(`EditProfile`, () => {
    it(`should render correctly in "debug" mode`, () => {
        const component = shallow(<EditProfile debug />);
        expect(component).toMatchSnapshot();
    });
});
import React from 'react';
import { shallow } from 'enzyme';
import EditProfileButton from './index';

describe(`EditProfileButton`, () => {
    it(`should render correctly in "debug" mode`, () => {
        const component = shallow(<EditProfileButton debug />);
        expect(component).toMatchSnapshot();
    });
});
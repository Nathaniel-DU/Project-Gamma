import React from 'react';
import { shallow } from 'enzyme';
import UpdateView from './index';

describe(`UpdateView`, () => {
    it(`should render correctly in "debug" mode`, () => {
        const component = shallow(<UpdateView debug />);
        expect(component).toMatchSnapshot();
    });
});
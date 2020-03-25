import React from 'react';
import { shallow } from 'enzyme';
import FormPage from './index';

describe(`FormPage`, () => {
    it(`should render correctly in "debug" mode`, () => {
        const component = shallow(<FormPage debug />);
        expect(component).toMatchSnapshot();
    });
});
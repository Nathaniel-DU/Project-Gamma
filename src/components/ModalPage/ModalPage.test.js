import React from 'react';
import { shallow } from 'enzyme';
import ModalPage from './index';

describe(`ModalPage`, () => {
    it(`should render correctly in "debug" mode`, () => {
        const component = shallow(<ModalPage debug />);
        expect(component).toMatchSnapshot();
    });
});
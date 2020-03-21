import React from 'react';
import { shallow } from 'enzyme';
import StartLocationButton from './index';

describe('StartLocationButton', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<StartLocationButton debug />);
        expect(component).toMatchSnapshot();
    })
})
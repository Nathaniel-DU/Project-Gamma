import React from 'react';
import { shallow } from 'enzyme';
import StartLocation from './index';

describe('StartLocation', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<StartLocation debug />);
        expect(component).toMatchSnapshot();
    })
})
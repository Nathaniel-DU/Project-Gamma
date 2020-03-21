import React from 'react';
import { shallow } from 'enzyme';
import Friends from './index';

describe('Friends', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Friends debug />);
        expect(component).toMatchSnapshot();
    })
})
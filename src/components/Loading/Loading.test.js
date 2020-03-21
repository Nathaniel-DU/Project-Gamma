import React from 'react';
import { shallow } from 'enzyme';
import Loading from './index';

describe('Loading', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<Loading debug />);
        expect(component).toMatchSnapshot();
    })
})
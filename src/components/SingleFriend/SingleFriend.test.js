import React from 'react';
import { shallow } from 'enzyme';
import SingleFriend from './index';

describe('SingleFriend', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<SingleFriend debug />);
        expect(component).toMatchSnapshot();
    })
})
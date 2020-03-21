import React from 'react';
import { shallow } from 'enzyme';
import FriendSearch from './index';

describe('FriendSearch', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<FriendSearch debug />);
        expect(component).toMatchSnapshot();
    })
})
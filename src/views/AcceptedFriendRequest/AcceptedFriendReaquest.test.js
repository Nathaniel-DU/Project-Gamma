import React from 'react';
import { shallow } from 'enzyme';
import AcceptedFriendRequest from './index';

describe('AcceptedFriendRequest', () => {
    it('should render correctly in "debug" mode', () => {
        const component = shallow(<AcceptedFriendRequest debug />);
        expect(component).toMatchSnapshot();
    })
})
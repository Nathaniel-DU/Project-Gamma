import React from 'react';
import { shallow } from 'enzyme';
import DeleteFriend from './index';

describe(`DeleteFriend`, () => {
    it(`should render correctly in "debug" mode`, () => {
        const component = shallow(<DeleteFriend debug />);
        expect(component).toMatchSnapshot();
    });
});
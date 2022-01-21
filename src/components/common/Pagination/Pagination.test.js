// import { render } from '@testing-library/react';
import React from 'react';
import { create } from 'react-test-renderer';
import { Pagination } from './Pagination';

describe('Pagination component tests', () => {
    test('pages count is 11 but should be showed only 10', () => {
        const component = create(<Pagination totalUsersCount={11} pageSize={2} portionSize={1} />);
        const root = component.root;
        const spans = root.findAllByType('span')
        expect(spans.length).toBe(1)
    })
})

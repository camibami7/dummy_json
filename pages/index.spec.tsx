// @ts-nocheck
import { describe, expect } from '@jest/globals'
import Home from './'
import { render } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
expect.extend(toHaveNoViolations)

describe('index', () => {
    it('a11y - accessibility test', async () => {
        const { container } = render(<Home />)
        expect(await axe(container)).toHaveNoViolations()
    })
})

import { it, expect } from 'vitest';
import {mount} from '@vue/test-utils';
import RootPage from "../pages/index.vue";

it("Root Page is defined", async () => {
    const page = mount(RootPage)
    expect(page.text()).toContain("Where would you like to go?")
    expect(page.text()).toContain("Explore your travel opportunities with us!")
});
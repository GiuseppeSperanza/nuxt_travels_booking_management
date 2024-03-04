import { it, expect, describe } from 'vitest';
import TravelsRootPage from "../pages/travels/index.vue";
import {renderSuspended} from "@nuxt/test-utils/runtime";
import { screen } from '@testing-library/vue'
import AddNewTravel from "~/components/travels/AddNewTravel.vue";
import {mount} from "@vue/test-utils";
import Modal from "~/components/shared/Modal.vue";
import {createPinia, setActivePinia} from "pinia";
import {createTravel, travelsMock} from "~/composables/useMockService";


describe('Travels Page is defined', async () => {

    it('Add Travel component button exist', async () => {
        await renderSuspended(TravelsRootPage)
        expect(screen.getByText('Add Travel')).toBeDefined()
    });

    it('Filter Travels exist', async () => {
        await renderSuspended(TravelsRootPage)
        expect(screen.getByText('Sort')).toBeDefined()
        expect(screen.getByText('Best Rating')).toBeDefined()
        expect(screen.getByText('Newest')).toBeDefined()
        expect(screen.getByText('Price: Low To High')).toBeDefined()
        expect(screen.getByText('Price: High to Low')).toBeDefined()
    });

    it('Trigger click on Add New Travel', async () => {
        expect(AddNewTravel).toBeTruthy();
        expect(Modal).toBeTruthy();
        const wrapper = mount(AddNewTravel, {});
        await wrapper.get("button").trigger("click");
        expect(wrapper.html()).toContain('modal')
    });

    it('Check Travels list is correctly populated', async () => {
        expect(AddNewTravel).toBeTruthy();
        setActivePinia(createPinia())
        const travelStore = useTravelStore();
        const mockTravel = createTravel(1);
        travelStore.travels = [mockTravel];
        expect(travelStore.travels.length).toBe(1);
        travelStore.travels.push(...travelsMock());
        expect(travelStore.travels.length).toBeGreaterThan(1);
    });

});



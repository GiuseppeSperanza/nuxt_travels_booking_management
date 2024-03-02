
interface GlobalState {
    isMenuToggleOpen: boolean;
}

const initialState = {
    isMenuToggleOpen: false
}
export const useGlobalStore = defineStore({
    id: 'globalStore',
    state: (): GlobalState => ({ ...initialState }),
    actions: {
        toggleMenu() {
            const body = document.querySelector("body");
            body!.classList.toggle("menu-open");

            this.isMenuToggleOpen = !this.isMenuToggleOpen;
        }
    }
})
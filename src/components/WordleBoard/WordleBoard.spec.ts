import {mount} from '@vue/test-utils'
import WordleBoard from './WordleBoard.vue'
import {LOST_MESSAGE, WIN_MESSAGE} from "@/constants";
import {beforeEach, expect, vi} from "vitest";

describe('HelloWorld', () => {
    let wrapper: ReturnType<typeof mount>;
    let wordOfTheDay: string;

    beforeEach(() => {
        wordOfTheDay = "TESTS"
        wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
    })

    async function userInput(text: string) {
        const gussInput = wrapper.find<HTMLInputElement>('input[type=text]')
        await gussInput.setValue(text)
        await gussInput.trigger('keydown.enter')
    }

    it('should show a victory message after user match word of the day', async () => {
        await userInput("TESTS");

        expect(wrapper.text()).toContain(WIN_MESSAGE)
    });

    test("should show a lose message if user is incorrect and is game over", async () => {
        await userInput("WRONG");

        expect(wrapper.text()).toContain(LOST_MESSAGE)
    })

    test("should not ending message if game is on", async () => {
        expect(wrapper.text()).not.toContain(WIN_MESSAGE)
        expect(wrapper.text()).not.toContain(LOST_MESSAGE)
    })

    test("should always emit warning if word of the day do not have 5 letters", async () => {
        // const spy = vi.spyOn(console, 'warn')
        // // hide warn
        // spy.mockImplementation(() => null)
        // or
        console.warn = vi.fn()

        mount(WordleBoard, {props: {wordOfTheDay: "SPY"}})

        expect(console.warn).toHaveBeenCalled()
    })

    test("should emit warning if word of the day is not UPPERCASE", async () => {
        console.warn = vi.fn()

        mount(WordleBoard, {props: {wordOfTheDay: "tests"}})

        expect(console.warn).toHaveBeenCalled()
    })
})

import {mount} from '@vue/test-utils'
import WordleBoard from './WordleBoard.vue'
import {LOST_MESSAGE, WIN_MESSAGE} from "@/constants";
import {beforeEach, describe, expect, vi} from "vitest";

describe('WordleBoard', () => {
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


    describe("end of the game", () => {
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
    })

    describe("rules of the game", () => {

        test.each([
            {wordOfTheDay:"SPY", reason: "word-of-the-day must have 5 characters"},
            {wordOfTheDay:"tests", reason: "word-of-the-day must me br all uppercase"},
        ])("$wordOfTheDay warning provided reason: $reason", async ({wordOfTheDay, reason}) => {
            // const spy = vi.spyOn(console, 'warn')
            // // hide warn
            // spy.mockImplementation(() => null)
            // or
            console.warn = vi.fn()

            mount(WordleBoard, {props: {wordOfTheDay}})

            expect(console.warn).toHaveBeenCalled()
        })
    })


    describe("player input", () => {
        test.todo("player gusses are limited to 5 letters")
        test.todo("player gusses not case sensitive")
        test.todo("player gusses has only letters")
    })

})

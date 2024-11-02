import { mount } from '@vue/test-utils'
import WordleBoard from './WordleBoard.vue'
import {LOST_MESSAGE, WIN_MESSAGE} from "@/constants";
import {beforeEach} from "vitest";

describe('HelloWorld', () => {
  let wrapper: ReturnType<typeof mount>;
  let wordOfTheDay: string;

  beforeEach(() => {
    wordOfTheDay= "TESTS"
    wrapper = mount(WordleBoard, {props: {wordOfTheDay}})
  })

  it('should show a victory message after user match word of the day', async () => {
    const gussInput = wrapper.find<HTMLInputElement>('input[type=text]')
    await gussInput.setValue("TESTS")
    await gussInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(WIN_MESSAGE)
  });

  test("should show a lose message if user is incorrect and is game over", async () => {
    const gussInput = wrapper.find<HTMLInputElement>('input[type=text]')
    await gussInput.setValue("WRONG")
    await gussInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(LOST_MESSAGE)
  })

  test("should not ending message if game is on", async () => {
    expect(wrapper.text()).not.toContain(WIN_MESSAGE)
    expect(wrapper.text()).not.toContain(LOST_MESSAGE)
  })
})

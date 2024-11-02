import { mount } from '@vue/test-utils'
import WordleBoard from './WordleBoard.vue'
import {LOST_MESSAGE, WIN_MESSAGE} from "@/constants";

describe('HelloWorld', () => {
  it('should show a victory message after user match word of the day', async () => {
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

    const gussInput = wrapper.find<HTMLInputElement>('input[type=text]')
    await gussInput.setValue("TESTS")
    await gussInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(WIN_MESSAGE)
  });

  test("should show a lose message if user is incorrect and is game over", async () => {
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

    const gussInput = wrapper.find<HTMLInputElement>('input[type=text]')
    await gussInput.setValue("WRONG")
    await gussInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(LOST_MESSAGE)
  })

  test("should not ending message if game is on", async () => {
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay: "TESTS"}})

    expect(wrapper.text()).not.toContain(WIN_MESSAGE)
    expect(wrapper.text()).not.toContain(LOST_MESSAGE)
  })
})

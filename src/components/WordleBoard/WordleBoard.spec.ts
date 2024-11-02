import { mount } from '@vue/test-utils'
import WordleBoard from './WordleBoard.vue'
import {WIN_MESSAGE} from "@/constants";

describe('HelloWorld', () => {
  it('should show a victory message after user match word of the day', async () => {
    const wrapper = mount(WordleBoard, {props: {wordOfTheDay: WIN_MESSAGE}})

    const gussInput = wrapper.find('input[type=text]')
    await gussInput.setValue(WIN_MESSAGE)
    await gussInput.trigger('keydown.enter')

    expect(wrapper.text()).toContain(WIN_MESSAGE)
  });

  test.todo("should show a lose message if user is incorrect and is game over")
  test.todo("should show a wrong answer message if user is incorrect ")
})

import { mount } from '@vue/test-utils';
import Time from '../../src/components/Time.vue';

const currentTimeMock = "2021-05-02T00:37:24.744Z";
const dateMock = new Date(currentTimeMock);
const timeMock = `It is ${dateMock.toLocaleDateString()} at ${dateMock.toLocaleTimeString()}`;

global.fetch = jest.fn( () =>
  Promise.resolve({
    json: () => Promise.resolve({currentTime: currentTimeMock})
  })
);

describe('Time.vue', () => {
  it('renders props.time when passed', () => {
    const msg = 'It is 5/1/2021 at 7:25:42 PM'
    const wrapper = mount(Time, {
      propsData: { time: msg }
    })
    expect(wrapper.text()).toMatch(msg)
  });

  it('renders Get Time button', () => {
    const wrapper = mount(Time);

    const button = wrapper.find('button');

    expect(button.exists());
    expect(button.text()).toMatch('Get Time');
  });

  it('updates time on button press', async () => {
    const wrapper = mount(Time);

    await wrapper.find('button').trigger('click');

    expect(wrapper.props('time')).toMatch(timeMock);
  });
});

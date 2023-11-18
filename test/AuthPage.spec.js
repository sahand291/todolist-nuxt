import { shallowMount } from '@vue/test-utils'
import AuthPage from '~/pages/auth/index.vue'

describe('Authentication page', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(AuthPage)
  })
  test('Authenticate page should be defined', () => {
    expect(wrapper.vm).toBeDefined()
  })
  test('Page should be on login mode in initial load ', () => {
    const formTitle = wrapper.find('.form-title').text()
    const buttonText = wrapper.find('.login-btn').text()

    expect(formTitle).toBe('Login')
    expect(buttonText).toBe('Login')
  })
  test('Page should be in SingUp mode if isSingInMode is false', async () => {
    await wrapper.setData({
      isSigninMode: false,
    })
    const formTitle = wrapper.find('.form-title').text()
    const buttonText = wrapper.find('.login-btn').text()

    expect(formTitle).toBe('Signup')
    expect(buttonText).toBe('Signup')
  })
  test('Page should be in Login mode if isSingInMode is true', async () => {
    await wrapper.setData({
      isSigninMode: true,
    })
    const formTitle = wrapper.find('.form-title').text()
    const buttonText = wrapper.find('.login-btn').text()

    expect(formTitle).toBe('Login')
    expect(buttonText).toBe('Login')
  })

  test('Button should chane isSignInMode', async () => {
    const switchModeBtn = await wrapper.find('a')

    await wrapper.setData({
      isSigninMode: false,
    })
    await switchModeBtn.trigger('click')

    expect(wrapper.vm.isSigninMode).toBeTruthy()
  })
  test('Button should call correct function based in isSigninMode', async () => {
    // const mockMethod = jest.spyOn(AuthPage.options.methods, 'onSubmit')
    const mockMethod = jest.fn()
    const wrapper2 = shallowMount(AuthPage, {
      methods: {
        onSubmit: mockMethod,
      },
    })
    // console.log(mockMethod)
    const form = wrapper2.find('.auth-form')

    await form.trigger('submit')
    expect(mockMethod).toBeCalled()
  })
})

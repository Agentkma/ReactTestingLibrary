// * these should normally be in your jest setupTestFrameworkScriptFile
import 'jest-dom/extend-expect'
import 'react-testing-library/cleanup-after-each'

// 0⃣ 🐨 you'll need these:
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import {CSSTransition as MockCSSTransition} from 'react-transition-group'
import {HiddenMessage} from '../hidden-message'

// Our component uses a react animation library called react-transition-group.
// By its nature, this library does some interesting things to keep an element
// in the DOM as it's transitioning out which force us to account for those
// in our test. This is really an implementation detail and it is kind of
// annoying. So let's mock out that library to make our tests faster to run
// and easier to write while still getting the confidence that we're hoping for.

// If you look at the hidden-message module we're importing, it only uses the
// `CSSTransition` component from the react-transiimport { CSSTransition } from 'react-transition-group';
//tion-group module. So in
// our mock module factory function that's all we need to return
// 7⃣ 🐨 use jest.mock to mock out the react-transition-group component
// 💯 jest.mock('react-transition-group', () => { /* return the mock object */ })
// 📖 https://jestjs.io/docs/en/jest-object#jestmockmodulename-factory-options
jest.mock('react-transition-group', () => {
  /* return the mock object */
  // * adding the jest.fn() allows us to use  `toHaveBeenCalled..`
  return {
    CSSTransition: jest.fn(props => (props.in ? props.children : null)),
  }
})
test('shows hidden message when toggle is clicked', () => {
  // 1⃣ 🐨 render the HiddenMessage component with any message you want
  const myMessage = 'Can you See me?'
  const {getByText, queryByText} = render(
    <HiddenMessage>
      <div>{myMessage}</div>
    </HiddenMessage>,
  )
  // 2⃣ 🐨 get the toggle button
  // 💯 (use getByText)
  const button = getByText(/Toggle/i)
  // 3⃣ 🐨 assert that the text you want to render is not in the document
  // 💯 (use `queryByText` and `not.toBeInTheDocument`)
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  // 📖 https://github.com/gnapse/jest-dom#tobeinthedocument
  //
  // 4⃣ 🐨 Use `fireEvent` to click on the button:

  fireEvent.click(button)
  // 📖 https://github.com/kentcdodds/react-testing-library/blob/b18ff5b96210a887e784b9f53bd886e11b6ed5e0/README.md#fireeventnode-htmlelement-event-event
  //
  // 5⃣ 🐨 assert that your message is in the docuemnt
  expect(queryByText(myMessage)).toBeInTheDocument()
  // 6⃣ 🐨 click on the button again
  fireEvent.click(button)
  // 8⃣ 🐨 assert that your message is not in the docuemnt anymore
  expect(queryByText(myMessage)).not.toBeInTheDocument()
  // * This gives us confidece CSSTransition is actually working properly
  expect(MockCSSTransition).toHaveBeenCalledTimes(3)
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react-testing-library-course&e=mock-component&em=kevin.m.anderson@icloud.com
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})

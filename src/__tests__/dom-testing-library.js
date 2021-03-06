import 'jest-dom/extend-expect'
import React from 'react'
import ReactDOM from 'react-dom'
// 🐨 you'll need the getQueriesForElement function from 'dom-testing-library'
import {getQueriesForElement} from 'dom-testing-library'
// 📖 read more in the docs: https://github.com/kentcdodds/dom-testing-library/blob/7cb84a9068fd04d17d89edb8988fcc181a40becf/README.md#within-and-getqueriesforelement-apis
import {FavoriteNumber} from '../favorite-number'

test('renders a number input with a label "Favorite Number"', () => {
  const div = document.createElement('div')
  ReactDOM.render(<FavoriteNumber />, div)
  // use getQueriesForElement with the `div` to get the "getByLabelText" query
  const queries = getQueriesForElement(div)

  // remove the assertion on the label.
  // 📖 read more in the docs: https://github.com/kentcdodds/dom-testing-library/blob/7cb84a9068fd04d17d89edb8988fcc181a40becf/README.md#getbylabeltext
  //expect(div.querySelector('input')).toHaveAttribute('type', 'number')
  //expect(div.querySelector('label')).toHaveTextContent('Favorite Number')
  // * Using regexe to match text , could use string `Favorite Number` also
  // * getByText( (conents, element=> true))
  // * passing function allows you to iterate through elements and look for something
  // * will return true/false
  expect(queries.getByLabelText(/favorite number/i)).toHaveAttribute(
    'type',
    'number',
  )
})

//////// Elaboration & Feedback /////////
// When you've finished with the exercises:
// 1. Copy the URL below into your browser and fill out the form
// 2. remove the `.skip` from the test below
// 3. Change submitted from `false` to `true`
// 4. And you're all done!
/*
http://ws.kcd.im/?ws=react-testing-library-course&e=dom-testing-library&em=kevin.m.anderson@icloud.com
*/
test('I submitted my elaboration and feedback', () => {
  const submitted = true // change this when you've submitted!
  expect(submitted).toBe(true)
})
////////////////////////////////

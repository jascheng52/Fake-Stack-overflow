
import React from 'react'
import { enterKey } from './search'
import PropTypes from 'prop-types'

FakeStackOverflow.propTypes = {
  setShowPage: PropTypes.func
}
export default function FakeStackOverflow ({ setShowPage }) {
  return (
        <>
        <div id = "banner"><span id = "title">Fake Stack Overflow</span>
        <div id = "searchbar">
              <input id = "searchText" type = "text" placeholder="Search ..." name = "searchbar" onKeyUp={(e) => enterKey(e, setShowPage)}/>
        </div>
      </div>
      </>
  )
}

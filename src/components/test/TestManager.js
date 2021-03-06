import React, { Component } from 'react'
import { connect } from 'react-redux'

import {
  CreateTestForm,
  Test,
  TestSummarize
} from './../testComponents'

let TestManager = class extends Component {
  render() {
    const { test } = this.props

    switch (test.get('state')) {
      case 'creating':
        return <CreateTestForm />
      case 'passing':
        return <Test test={test} />
      case 'summarizing':
        return <TestSummarize test={test} />
    }
  }
}

const mapStateToProps = (state) => ({
  test: state.get('test')
})

TestManager = connect(
  mapStateToProps,
  null
)(TestManager)

export default TestManager

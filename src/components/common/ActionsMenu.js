import React, { Component } from 'react'
import { fromJS } from 'immutable'
import styles from '../../styles/components/ActionsMenu.css'

class ActionsMenu extends Component {
  state = {
    data: fromJS({
      isActive: false
    })
  }

  componentDidMount() {
    document.addEventListener('click', this.handleDocumentClick)
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleDocumentClick)
  }

  handleMouseenter = () => {
    this.setState(({ data }) => ({
      data: data.update('isShown', value => true)
    }))
  }

  handleMouseleave = () => {
    this.setState(({ data }) => ({
      data: data.update('isShown', value => false)
    }))
  }

  handleDocumentClick = () => {
    if (this.state.data.get('isActive'))
      this.setIsActive(false)
  }

  handleClick = (e) => {
    e.nativeEvent.stopImmediatePropagation()
  }

  setIsActive = (isActive = true) => {
    this.setState(({ data }) => ({
      data: data.set('isActive', isActive)
    }))
  }

  renderVisible() {
    const isActive = this.state.data.get('isActive')
    const { actions, align } = this.props

    let menuStyle
    if (!align || align === 'right')
      menuStyle = 'menu--right'
    if (align === 'left')
      menuStyle = 'menu--left'

    return (
      <div onClick={this.handleClick}>
        <span
          className={styles.button}
          onClick={() => this.setIsActive(true)}
        />

        {isActive &&
          <div className={styles['menu-wrapper']}>
            <div className={styles[menuStyle]}>
              <ul className={styles.list}>
                {actions.map(action => (
                  <li
                    className={styles.action}
                    key={action.name}
                    onClick={action.handler}
                  >
                    {action.name}
                  </li>
                ))}
              </ul>
            </div>
          </div>}
      </div>
    )
  }

  render() {
    const { isHovered } = this.props
    const isActive = this.state.data.get('isActive')

    return isHovered || isActive
      ? this.renderVisible()
      : null
  }
}

export default ActionsMenu

import React from 'react'

export class Tabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: 'forecast-day'
    }
  }

  handleTabItemClick = (e) => {
    const currentTabItem = e.target.closest('li')
    if (currentTabItem.classList.contains('is-active')) return

    const tabs = currentTabItem.parentNode
    tabs.childNodes.forEach((tabItem) => {
      if (tabItem === currentTabItem) {
        tabItem.classList.add('is-active')
        const active = tabItem.dataset.context
        this.setState({ activeForecast: active})
        this.props.showForecast(active)
      }
      else tabItem.classList.remove('is-active')
    })
  }

  render() {
    <div className='tabs is-centered'>
    <ul>
      <li className='is-active' data-context='forecast-day' onClick={this.handleTabItemClick}><a>
        <span className="icon is-small"><i className="fa fa-calendar"></i></span>
        <span>Day</span>
      </a></li>
      <li data-context='forecast-hour' onClick={this.handleTabItemClick}><a>
        <span className="icon is-small"><i className="fa fa-clock-o"></i></span>
        <span>Hour</span>
      </a></li>
    </ul>
  </div>
  }
}
import * as React from 'react'

import Slider from '../Slider'
import Counter from '../Counter'

const song = require('assets/song.mp3')

import { CSSTransition }  from 'react-transition-group'

import './style.scss'

interface State {
  loading: boolean
  images: any[]
  folder: string
  failedSong: boolean
  audio: HTMLAudioElement | null
}

export default class Home extends React.Component<{}, State> {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      images: [],
      folder: '/Appareil photo/alex et ophé/Parc Astérix',
      failedSong: false,
      audio: null
    }
  }

  async componentWillMount () {
    const links = await this.getLinks(this.state.folder)
    const imagesLinks = links.filter(item => !item.includes('.mp4'))
    const images = await Promise.all(imagesLinks.map(link => this.createSharedImageLinks(link)))

    this.setState({ images })

    await new Promise(resolve => setTimeout(() => resolve(), 1000))

    this.setState({ loading: false })
  }

  async componentDidMount () {
    await this.setState({ audio: new Audio(song) })
    this.state.audio.play().catch(() => this.setState({ failedSong: true }))
  }

  async request (url, args) {
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ ...args }),
      headers: {
        "Authorization": "Bearer lZd-kJlTGAAAAAAAAAAMUOIxFQQxx5iL5plzcKieYr8w_7CNUJzMiDUkbKPlorQ6",
        "Content-Type": "application/json",
      }
    })
    const datas = await response.json()

    return datas
  }

  async getLinks (path) {
    const { entries } = await this.request('https://api.dropboxapi.com/2/files/list_folder', { path })

    return entries.map(item => item.path_lower)
  }

  async createSharedImageLinks (path) {
    const format = url => {
      const splittedUrl = url.split('/')
      splittedUrl[2] = 'dl.dropboxusercontent.com'

      return splittedUrl.join('/')
    }

    const { url } = await this.request('https://api.dropboxapi.com/2/sharing/create_shared_link', { path })

    return format(url)
  }
 
  render () {
    return (
      <div>
        {this.state.failedSong &&
          <button
            className='Song-button'
            onClick={() => {
              this.state.audio.play()
              this.setState({ failedSong: false })
            }}
          >
            Play Song
          </button>
        }
        <div className='Background-Wrapper'>
          <div className='Filter' />
          <CSSTransition
            in={this.state.loading}
            timeout={500000}
            classNames="message"
          >
            <div className='Loader' />
          </CSSTransition>

          <div className='Content'>
            <p>Happy Birthday !!!</p>
            <p>Ophélie and Alexandre are together for</p>
            <Counter />
            <div className='heart-Wrapper'>
              <i className='heart'>♥</i>
              <i className='heart'>♥</i>
              <i className='heart'>♥</i>
            </div>
          </div>
          {this.state.images.length &&
            <Slider images={this.state.images} />
          }
        </div>
      </div>
    )
  }
}
import * as React from 'react'

import Slider from '../Slider'
import Counter from '../Counter'

const song = require('assets/song.mp3')

import { CSSTransition }  from 'react-transition-group'

import './style.scss'

interface State {
  loading: boolean
  images: any[]
  imagesLinks: any[]
  folder: string
  failedSong: boolean
  end: number
  start: number
  pageSize: number
  audio: HTMLAudioElement | null
}

export default class Home extends React.Component<{}, State> {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      images: [],
      imagesLinks: [],
      folder: '/Appareil photo/alex et ophé/Musée d\'histoires naturelles',
      failedSong: false,
      audio: null,
      pageSize: 20,
      start: 0,
      end: 20
    }
  }

  async componentWillMount () {
    const links = await this.getLinks(this.state.folder)
    this.setState({ imagesLinks: links.filter(item => !item.includes('.mp4')) })
    this.createShareImageLinks(this.state.start, this.state.end)
  }

  async componentDidMount () {
    await this.setState({ audio: new Audio(song) })
    this.state.audio.play().catch(() => this.setState({ failedSong: true }))
  }

  createShareImageLinks (start, end) {
    const slicedImagesLinks = this.state.imagesLinks.slice(start, end)

    this.fetchSharedImageLinks(slicedImagesLinks)
  }

  fetchSharedImageLinks (array) {
    array.map(async link => {
      const sharedImageLink = await this.fetchSharedImageLink(link)
      this.setState(prevState => ({ images: [...prevState.images, sharedImageLink] }))
    })
  }

  async request (url, args) {
    const response = await fetch(url, {
      method: 'POST',
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

  async fetchSharedImageLink (path) {
    const { url } = await this.request('https://api.dropboxapi.com/2/sharing/create_shared_link', { path })
    const format = url => {
      const splittedUrl = url.split('/')
      splittedUrl[2] = 'dl.dropboxusercontent.com'

      return splittedUrl.join('/')
    }

    return format(url)
  }

  incrementPage () {
    this.setState({ 
      start: this.state.start + this.state.pageSize,
      end: this.state.end + this.state.pageSize
    })
  }

  fetchMore () {
    this.incrementPage()
    this.createShareImageLinks(this.state.start, this.state.end)
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
            <Slider
              images={this.state.images}
              onChange={() => this.fetchMore()}
              loaded={() => this.setState({ loading: false })}
            />
          }
          <span className="Date">Vendredi 23 Février 2018</span>
        </div>
      </div>
    )
  }
}
import './topsection.css'
import { Link } from 'react-router'

interface TopSectionProps {
  pageName: string
  pageImage: string
  title: string
  phrase: string
}

function TopSection(props: TopSectionProps) {
  return (
    <div className={props.pageName}>
      <img alt='DisplayPicture' src={props.pageImage} />

      <div className='hero-text'>
        <h1>{props.title}</h1>
        <p>{props.phrase}</p>
        <Link to='/'>
          <button>Home</button>
        </Link>
      </div>
    </div>
  )
}

export default TopSection

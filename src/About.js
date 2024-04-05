import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main className='About'>
      <p>
        Feeling bored huh? Try something <Link to='/' className='highlight'>here</Link> to help you cheer up.
      </p>
    </main>
  )
}

export default About
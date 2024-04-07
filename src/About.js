import { Link } from 'react-router-dom';

const About = () => {
  return (
    <main className='About'>
      <p>
        Feeling bored? Try something <Link to='/' className='highlight'>here</Link> to help you cheer up.
      </p>
      <p>
        Also checkout the <Link target='_blank' to='https://github.com/Yashdt12/i-am-bored' className='highlight'>github page</Link>.
      </p>
    </main>
  )
}

export default About
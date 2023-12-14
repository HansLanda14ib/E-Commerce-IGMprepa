import React from 'react'
import styled from 'styled-components'
import {PageHero} from '../components'
import aboutImg from '../assets/img_1.png'

const AboutPage = () => {
    return (
        <main>
            <PageHero title='about'/>
            <Wrapper className='page section section-center'>
                <img src={aboutImg} alt='nice desk'/>
                <article>
                    <div className='title'>
                        <h2>IBN GHAZI PREPA IN FIGURES</h2>
                        <div className='underline'></div>
                    </div>
                    <p>
                        The goal is to open new horizons for our students and provide them with a greater range of
                        choices.

                        At Classes Prépa Ibn Ghazi Marrakech, we also stand out for the exceptional working conditions
                        we have established. It is crucial for us that our students perceive the "Prep experience" as a
                        great adventure, where they learn about themselves, strive to excel, embrace competition, and
                        embrace continuous improvement. That's why we foster the creation of a vibrant campus community
                        (Student Union, Sports Tournaments, Excursions, games, etc.).

                        However, what makes the Prep experience more manageable is the close-knit and trusting
                        relationship among Students, Administration, Teachers, and Parents. Not everything is perfect,
                        but our approach is honest and well-considered. Many of our students and their parents
                        enthusiastically share with us the positive transformations they have experienced with us—the
                        opening of new perspectives, behavioral changes, and the discovery of their revealed potential.
                        We take pride in and are grateful for these transformations!
                    </p>
                </article>
            </Wrapper>
        </main>
    )
}
const Wrapper = styled.section`
  display: grid;
  gap: 4rem;

  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    height: 500px;
    object-fit: cover;
  }

  p {
    line-height: 2;
    max-width: 45em;
    margin: 0 auto;
    margin-top: 2rem;
    color: var(--clr-grey-5);
  }

  .title {
    text-align: left;
  }

  .underline {
    margin-left: 0;
  }

  @media (min-width: 992px) {
    grid-template-columns: 1fr 1fr;
  }
`
export default AboutPage

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/free-regular-svg-icons';
import '../styles/footer.css';

function Footer() {
  return (
    <footer>
      <section className='contact'>
        <small>contact: email@email.com</small>
      </section>
      <section className='legal'>
        <small>Legal Stuff </small>
        <FontAwesomeIcon icon={faCopyright} />
      </section>
      <section className='links'>
        <small>external links</small>
      </section>
    </footer>
  );
}

export default Footer;

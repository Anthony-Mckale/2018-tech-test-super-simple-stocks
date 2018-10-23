import React from 'react';

function Header() {
  return (
    <header>
      <h1>Anthony McKale's Simple Stocks</h1>
      <nav>
        <ul className="nav nav-pills">
          <li role="presentation"><a href="https://www.linkedin.com/in/anthonymckale/">Me on Linked In</a></li>
          <li role="presentation"><a href="mailto://anthony@zapper.hodgers.com">Email Me</a></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;

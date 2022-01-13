import React from 'react';

const ItemDetails = () => (
  <div style={{ width: '100%' }}>
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

      <h3 style={{ textAlign: 'center' }}><strong>Lada Dealer</strong></h3>

      <p style={{ textAlign: 'center' }}>
        Jeżeli są Państwo zainteresowani naszą ofertą, to prosimy o kontakt telefoniczny:
        <br />
        <a href="tel:+48555555555">+48 555 555 555</a>
      </p>
      <p>
        Dane do przelewu:
        <br />
        Odbiorca: Lada Dealer Warszawa
        <br />
        Nr konta: 12 3456 7891 0111 2131 4151
      </p>
      <div>
        <p style={{ textAlign: 'center' }}>
          Plac Politechniki 1
          <br />
          01-000 Warszawa
        </p>
        <p style={{ textAlign: 'center' }}>
          e-mail:
          {' '}
          <a href="mailto:kontakt@lada.pl">kontakt@lada.pl</a>
        </p>
      </div>
    </div>
  </div>
);

export default ItemDetails;

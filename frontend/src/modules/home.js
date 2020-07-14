/*
 *  Copyright (C) 2020  Unknown
 *  
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU Affero General Public License as published
 *  by the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *  
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU Affero General Public License for more details.
 *  
 *  You should have received a copy of the GNU Affero General Public License
 *  along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class homeComponent extends React.Component {
  render () {
    return (
      <div className='container p-4'>
        <div className='row'>
          <img src='https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://eppeok.guru/wp-content/uploads/2019/12/main-bg.jpg' class='img-fluid' alt='image' />
          <div className='col-md-12'>
            <blockquote className='blockquote text-right'>
              <p className='mb-0'>API Rest + React </p>
              <footer className='blockquote-footer'><cite title='Source Title'>Jon Echeveste González</cite></footer>
            </blockquote>
          </div>
        </div>
      </div>
    );
  }
}

export default homeComponent;

import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

class homeComponent extends React.Component  {
  render()
  {
    return (
        <div className="container p-4">
            <div className="row"> 
                <img src="https://cdn.shortpixel.ai/client/q_glossy,ret_img/https://eppeok.guru/wp-content/uploads/2019/12/main-bg.jpg" class="img-fluid" alt="image"/>
                <div className="col-md-12">
                    <blockquote className="blockquote text-right">
                        <p className="mb-0">API Rest + React </p>
                        <footer className="blockquote-footer"><cite title="Source Title">Jon Echeveste González</cite></footer>
                    </blockquote>
                </div>     
            </div>
        </div>
    );
  }
}

export default homeComponent;
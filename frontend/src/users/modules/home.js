/*
 *  Copyright (C) 2020 ThePringaos
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
import styled from 'styled-components';
import BtnLink from './components/buttons/home/BtnLink';
import { Container, Row, Col, Image, Card } from 'react-bootstrap';

import logoImg from '../../images/rincon-icon.png';
import backImg from '../../images/fachada-rincon.jpg';

const ContainerHome = styled.div`
    height: 100vh;
    width:100%;
    background-image: url(${backImg});
    background-repeat: no-repeat;
    background-size: cover;
    filter: saturate(135%) contrast(75%) invert(23%);
    -webkit-filter: saturate(135%) contrast(75%) invert(23%);
    z-index: 1;
`;

const ContainerRequestDate = styled.div`
    position: absolute;
    top: 20%;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    z-index: 100;
`;

const ContainerCard = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: rgba(255,255,255,.7);
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
    text-align: center;
`;

const HomeComponent = () => {
  return (
    <>
      <ContainerHome />
      <ContainerRequestDate>
        <Container className='p-4'>
          <Row>
            <Col lg={{ span: 4, offset: 4 }}>
              <Image
                className='mb-4'
                src={logoImg}
                alt='icon'
                height='72'
                width='72'
                rounded
              />
              <ContainerCard>
                <Card.Header>
                  <h1 className='h3 py-3 my-0 font-weight-normal'>Pedir cita</h1>
                </Card.Header>
                <Card.Body className='d-flex flex-column'>
                  <BtnLink
                    content='Profesorado'
                    destiny='/profesorado-form'
                    style='mb-4'
                  />
                  <BtnLink
                    content='Secretaría'
                    destiny='/secretaria-form'
                  />
                </Card.Body>
              </ContainerCard>
            </Col>
          </Row>
        </Container>
      </ContainerRequestDate>
    </>
  );
};

export default HomeComponent;

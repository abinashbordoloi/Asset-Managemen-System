import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import headerImage from './header.png';

const HomePage = () => {
  return (
    <div>
      <header className="bg-dark py-3" style={{ backgroundImage: `url(${headerImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Container>
        <h1 className="text-white" style={{ fontFamily: 'Helvetica, sans-serif', fontSize: '50px', fontWeight: 'bold', textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}>NEEPCO : ASSET MANAGEMENT APPLICATION</h1>
        </Container>
      </header>

      <section className="py-5"style={{ backgroundColor: '#FFE5B4' }}>
        <Container>
          <Row>
            <Col md={6}>
              <h2>Welcome to NEEPCO:Asset Management</h2>
              <p className="lead" >
              Maximize Efficiency, Minimize Hassle
                </p>
              <Button as={Link} to="/asset-view" variant="primary">
                View Assets
              </Button>
            </Col>
            <Col md={6}>
              <Image
                src="./R.png"
                alt="NEEPCO"
                height={350}
                weight = {350}
                // fluid 
                className="home-image"
              />
            </Col>
          </Row>
        </Container>
      </section>

      <footer className="bg-dark py-2 mt-auto">
  <Container>
    <Row>
      <Col className="text-white text-center">
        <p className="m-0" style={{ fontSize: "20px" }}>
          NEEPCO &copy; {new Date().getFullYear()} | All rights reserved.
        </p>
        <p className="m-0" style={{ fontSize: "10px" }}>
          Designed and Developed by <a href="https://yourwebsite.com">GU Neepco Interns</a>
        </p>
      </Col>
    </Row>
  </Container>
</footer>

    </div>
  );
};

export default HomePage;

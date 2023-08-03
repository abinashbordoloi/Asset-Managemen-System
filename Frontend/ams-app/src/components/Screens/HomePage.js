import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';


const HomePage = () => {
  return (
    <div>
      <header className="bg-dark py-5">
        <Container>
          <h1 className="text-white">NEEPCO Asset Management App</h1>
        </Container>
      </header>

      <section className="py-5">
        <Container>
          <Row>
            <Col md={6}>
              <h2>Welcome to NEEPCO Asset Management</h2>
              <p className="lead">
                Helps you to manage your assets in a better way.
               
                </p>

              
              <Button as={Link} to="/asset-entry" variant="primary">
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
              <p className="m-0">
                NEEPCO &copy; {new Date().getFullYear()} | All rights reserved.
              </p>
              <p className="m-0">
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

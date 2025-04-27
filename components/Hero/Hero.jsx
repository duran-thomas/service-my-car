import './hero.module.css'
import { Container, Row, Col, Card } from 'react-bootstrap'
import InlineWizardForm from '../CarSelector/InlineWizardForm'

const Hero = () => {
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage: `url('/images/hero-background.jpg')`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        height: "75vh",
        width: "100%",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="mask" style={{
          backgroundColor: "rgba(0, 0, 0, 0.40)",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}>
          <Container>
            <Row>
              <Col md={8} className="text-white">
                <div className="d-flex container align-items-center h-100">
                  <div className="text-white">
                    <h1 className="mb-3" style={{ color: "#ffffff" }}>
                      Jamaica's #1 Car Servicing
                    </h1>
                    <h5 className="mb-3" style={{ color: "#ffffff" }}>
                      We service best
                    </h5>
                  </div>
                </div>
              </Col>  
              <Col md={4} className="text-white">
                <div className="d-flex container align-items-center h-100">
                  <Card className='hero-form'>
                    <InlineWizardForm />
                  </Card>
                </div>
              </Col>  
              
            </Row>
          </Container>
        </div>
    </div>
  )
}

export default Hero
import './heroGeneral.module.css'
import { Container, Row, Col, Card } from 'react-bootstrap'
import InlineWizardForm from '../CarSelector/InlineWizardForm'

const HeroGeneral = (props) => {
  const { image, title, subtitle } = props;
  return (
    <div
      className="bg-image"
      style={{
        backgroundImage:  `url('/images/hero-background.jpg')`,
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
                      {title}
                    </h1>
                    <h5 className="mb-3" style={{ color: "#ffffff" }}>
                      {subtitle}
                    </h5>
                  </div>
                </div>
              </Col>  
            </Row>
          </Container>
        </div>
    </div>
  )
}

export default HeroGeneral
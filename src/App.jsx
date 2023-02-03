import { useState } from "react";
import "./App.css";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";

function App() {
  const [formActive, setFormActive] = useState(true);
  const [articleActive, setArticleActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const [keyword, setKeyword] = useState("");
  const [paragraph, setParagraph] = useState("");
  const [apikey, setApikey] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // alert(`Keyword : ${keyword}, Paragraph : ${paragraph}, Apikey : ${apikey}`);
    let baseUrl = "http://localhost:5000/articles";
    let formData = new FormData();

    formData.append("keyword", keyword);
    formData.append("paragraph", paragraph);
    formData.append("apikey", apikey);

    const config = {
      headers: { "content-type": "application/x-www-form-urlencoded" },
    };

    axios
      .post(baseUrl, formData, config)
      .then((response) => {
        console.log(response);
        setKeyword(response.data.title);
        setImage(response.data.image);
        setContent(response.data.content);
        setLoading(false);
        setFormActive(false);
        setArticleActive(true);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  };

  return (
    <Container className="appContainer">
      <Row>
        <h2 className="appTitle">ARTICLE GENERATOR USING CHATGPT OPENAI</h2>
      </Row>

      {/* FORM */}
      <Row className="appForm" style={{ display: formActive ? "" : "none" }}>
        <Col md={3}></Col>
        <Col md={6}>
          <form onSubmit={handleSubmit}>
            <div className="input-group input-group-lg appInputForm">
              <input
                type="text"
                className="form-control"
                placeholder="Entry your keyword"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                required
              />
            </div>

            <div className="input-group input-group-lg appInputForm">
              <input
                type="text"
                className="form-control"
                placeholder="How many paragraph ?"
                value={paragraph}
                onChange={(e) => setParagraph(e.target.value)}
                required
              />
            </div>

            <div className="input-group input-group-lg appInputForm">
              <input
                type="text"
                className="form-control"
                placeholder="Enter your OpenAi API Key"
                value={apikey}
                onChange={(e) => setApikey(e.target.value)}
                required
              />
            </div>

            <center>
              <Button
                type="submit"
                className="btn-lg btn-primary appButtonForm"
              >
                {loading ? (
                  <>
                    Loading ...
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </>
                ) : (
                  "Generate"
                )}
              </Button>
            </center>
          </form>
        </Col>
        <Col md={3}></Col>
      </Row>

      {/* ARTICLE */}
      <Row
        className="appArticle"
        style={{ display: articleActive ? "" : "none" }}
      >
        <Col md={3}></Col>
        <Col md={6}>
          <center>
            <h1 className="appTitleArticle">
              Article Generated With Keyword : {keyword}
            </h1>
          </center>
          <article>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </article>
        </Col>
        <Col md={3}></Col>
      </Row>
    </Container>
  );
}

export default App;

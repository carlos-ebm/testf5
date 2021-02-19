import React, { useState, useEffect } from "react";
import ListMostViewed from "../../../components/Visitor/MostViewed/ListMostViewed";
import { Row, Col, Card, List } from "antd";
import PublicationsPreviewHome from "../../../components/Visitor/Publications/PublicationsPreviewHome";

import { getSecondaryPublicationsVisitorApi, getPrincipalPublicationVisitorApi } from "../../../api/publication";

import "./Home.scss";

export default function Home() {
  const [publications, setPublications] = useState([]);
  const [publicationPrincipal, setPublicationPrincipal] = useState([]);

  useEffect(() => {
    getSecondaryPublicationsVisitorApi().then((response) => {
      setPublications(response.secondaryPublications);
    });
    getPrincipalPublicationVisitorApi().then((response)=>{
      setPublicationPrincipal(response.publication);
    });
  });

  return (
<>
      <Row className="row">
        <Col className="row__col-left" span={16}>
            <PublicationsPreviewHome publicationPrincipal={publicationPrincipal} publications={publications}/>
        </Col>

        <Col className="row__col-right" span={6}>
          <Card className="row__col-right__mostviewed" title="Noticias más vistas">
            <ListMostViewed />
          </Card>
        </Col>
      </Row>
    </>
  );
}

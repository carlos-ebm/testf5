import React from "react";
import { Card, List, Row } from "antd";

import "./PublicationsPreviewHome.scss";

import PublicationPreview from "../PublicationPreview";
import PublicationPreviewPrincipal from "../PublicationPreviewPrincipal";
import Publications from "../../../../pages/Admin/Publications/Publications";

export default function PublicationsPreviewHome(props) {
  const { publicationPrincipal, publications } = props;

  return (
    <>
      <Row className="row-principal" >
        <PublicationPreviewPrincipal
          publicationPrincipal={publicationPrincipal}
        />
      </Row>

      <Row className="row-secondary">
        <List
          grid={{ gutter: 8, column: 2 }}
          dataSource={publications}
          renderItem={(publication) => (
            <List.Item>
              <PublicationPreview publication={publication} />
            </List.Item>
          )}
        />
      </Row>

    </>
  );
}

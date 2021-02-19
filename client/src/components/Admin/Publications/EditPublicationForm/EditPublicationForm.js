import React, { useState, useEffect, useCallback } from "react";
import { Editor } from "react-draft-wysiwyg";
import {
  EditorState,
  convertToRaw,
  ContentState,
  convertFromHTML,
  convertFromRaw,
} from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import { useDropzone } from "react-dropzone";
import {
  Form,
  Input,
  Button,
  Radio,
  Checkbox,
  Avatar,
  notification,
  Row,
  Col,
  Divider,
  Upload,
  Image,
  Card,
  Select,
} from "antd";
import {
  UserOutlined,
  LockOutlined,
  MailOutlined,
  SaveOutlined,
} from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";

import "./EditPublicationForm.scss";
import { updatePublicationApi } from "../../../../api/publication";
const RadioGroup = Radio.Group;

export default function EditPublicationForm(props) {
  const { publication, setIsVisibleModal, setReloadPublications } = props;
  const [publicationData, setPublicationData] = useState({});

  const blocksFromHtml = htmlToDraft(publication.content);
  const { contentBlocks, entityMap } = blocksFromHtml;
  const state = ContentState.createFromBlockArray(contentBlocks, entityMap);

  const [stateEditor, setStateEditor] = useState({
    content: EditorState.createWithContent(state),
  });

  const cDate = new Date;

  useEffect(() => {
    setPublicationData({
      title: publication.title,
      subtitle: publication.subtitle,
      image: publication.image,
      content: publication.content,
      author: publication.author,
      visibility: publication.visibility,
      section: publication.section,
      modificationDate: cDate,
    });
  }, [publication]);

  const updatePublication = (e) => {
    const token = getAccessTokenApi();
    let publicationUpdate = publicationData;

    if (
      !publicationUpdate.title ||
      !publicationUpdate.subtitle ||
      !publicationUpdate.image ||
      !publicationUpdate.content ||
      !publicationUpdate.author ||
      !publicationUpdate.visibility ||
      !publicationUpdate.section
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    }

    updatePublicationApi(token, publicationUpdate, publication._id).then(
      (result) => {
        notification["success"]({
          message: result.message,
        });
        setIsVisibleModal(false);
        setReloadPublications(true);
      }
    );
  };

  return (
    <EditForm
      publicationData={publicationData}
      setPublicationData={setPublicationData}
      stateEditor={stateEditor}
      setStateEditor={setStateEditor}
      updatePublication={updatePublication}
    />
  );
}

function EditForm(props) {
  const {
    publicationData,
    setPublicationData,
    stateEditor,
    setStateEditor,
    updatePublication,
  } = props;

  const onEditorStateChange = (content) => {
    setStateEditor({
      content,
    });
    setPublicationData({
      ...publicationData,
      content: draftToHtml(
        convertToRaw(stateEditor.content.getCurrentContent())
      ),
    });
    //console.log(draftToHtml(convertToRaw(stateEditor.content.getCurrentContent())));
  };

  return (
    <Form className="publication-form" onFinish={updatePublication}>
      <Divider orientation="center">
        <h2 className="publication-form__title">
          Formulario de nueva publicación
        </h2>
      </Divider>
      <Row className="publication-form__row" type="flex">
        <Col className="publication-form__row__col" flex={4}>
          <Card
            type="inner"
            size="small"
            title="Datos de la noticia"
            className="publication-form__row__col__card"
          >
            <Form.Item>
              <Input
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="title"
                placeholder="Titular"
                className="publication-form__row__col__card__input"
                onChange={(e) =>
                  setPublicationData({
                    ...publicationData,
                    title: e.target.value,
                  })
                }
                value={publicationData.title}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<MailOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="subtitle"
                placeholder="Bajada"
                className="publication-form__row__col__card__input"
                onChange={(e) =>
                  setPublicationData({
                    ...publicationData,
                    subtitle: e.target.value,
                  })
                }
                value={publicationData.subtitle}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="image"
                placeholder="Imagen"
                className="publication-form__row__col__card__input"
                onChange={(e) =>
                  setPublicationData({
                    ...publicationData,
                    image: e.target.value,
                  })
                }
                value={publicationData.image}
              />
            </Form.Item>

            <Form.Item>
              <Input
                prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
                type="text"
                name="author"
                placeholder="Autor"
                className="publication-form__row__col__card__input"
                onChange={(e) =>
                  setPublicationData({
                    ...publicationData,
                    author: e.target.value,
                  })
                }
                value={publicationData.author}
              />
            </Form.Item>
            <Card className="publication-form__row__col__card__card">
              <Editor
                defaultEditorState={stateEditor.content}
                wrapperClassName="wrapper-class"
                editorClassName="editor-class"
                toolbarClassName="toolbar-class"
                onEditorStateChange={onEditorStateChange}
              />
            </Card>
          </Card>
        </Col>

        <Col className="publication-form__row__col" flex={1}>
          <Card
            type="inner"
            size="small"
            title="Visibilidad"
            className="publication-form__row__col__card"
          >
            <Form.Item>
              <RadioGroup
                name="visibility"
                onChange={(e) =>
                  setPublicationData({
                    ...publicationData,
                    visibility: e.target.value,
                  })
                }
                value={publicationData.visibility}
              >
                <Radio value="1">Publico</Radio>
                <Radio value="2">Privado</Radio>
                <Radio value="3">Oculto</Radio>
              </RadioGroup>
            </Form.Item>
          </Card>

          <Card
            type="inner"
            size="small"
            title="Seccion"
            className="publication-form__row__col__card"
          >
            <Form.Item>
              <RadioGroup
                name="section"
                onChange={(e) =>
                  setPublicationData({
                    ...publicationData,
                    section: e.target.value,
                  })
                }
                value={publicationData.section}
              >
                <Radio value="1">Nacional</Radio>
                <Radio value="2">Internacional</Radio>
                <Radio value="3">Ciencia</Radio>
                <Radio value="4">Deporte</Radio>
              </RadioGroup>
            </Form.Item>
          </Card>
        </Col>
      </Row>

      <Row className="publication-form__row" type="flex">
        <Col className="publication-form__row__col" flex={5}>
          <Form.Item>
            <Button
              htmlType="submit"
              className="publication-form__row__col__button"
            >
              Agregar publicación
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
}

import React, { useCallback, useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ContactDetailStyled from "./styled";
import Axios from "../../../APIService/axios";
import { GET_CONTACTS_LIST, GET_EPISODES_LIST } from "../../../APIService/APILinks";
import { ContactListState } from "../ContactList";
import { Col, Layout, Row, Spin } from "antd";
import moment from "moment";
import TableEpisodes from "./TableEpisodes";
import { ContactContext } from "../../../config/context/ContactContextProvider";
import { LeftOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;

export type EpisodeState = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  url: string;
  characters: string[];
  created: string;
};

const ContactDetails: React.FC = () => {
  let { state } = useLocation();
  let { id } = useParams();
  const [character, setCharacter] = useState<ContactListState | null>(state || null);
  const [episodes, setEpisodes] = useState<EpisodeState[] | undefined>();
  const [loading, setLoading] = useState<boolean>(false);
  const contactContext = useContext(ContactContext);
  const navigate = useNavigate();

  const fetchCharacterDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await Axios.get(`${GET_CONTACTS_LIST}/${id}`);
      if (response.status === 200 && response.data) {
        setCharacter(response.data);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  }, [id]);

  const fetchCharacterEpisodes = useCallback(async () => {
    try {
      setLoading(true);
      const arr = character?.episode.map((ep: string) => {
        const id = ep.split("/").pop();
        return id;
      });
      const response = await Axios.get(`${GET_EPISODES_LIST}/${arr}`);
      if (response.status === 200 && response.data) {
        if (Array.isArray(response.data)) {
          setEpisodes(response.data);
        } else {
          setEpisodes([response.data]);
        }

        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  }, [character]);

  useEffect(() => {
    if (!state) {
      fetchCharacterDetails();
    } else {
      setCharacter(state);
    }
  }, [state, fetchCharacterDetails]);

  useEffect(() => {
    if (character && character.episode.length > 0) {
      fetchCharacterEpisodes();
    }
  }, [character, fetchCharacterEpisodes]);

  const navigateBack = () => {
    navigate(-1);
  };

  return (
    <ContactDetailStyled>
      <Spin spinning={loading}>
        <Layout style={{ minHeight: "100vh" }}>
          {!loading && character && episodes ? (
            <>
              <Header className="site-header">
                {contactContext?.isMobile ? (
                  <div className="back-button" onClick={navigateBack}>
                    <LeftOutlined color="black" />
                  </div>
                ) : null}
                <Row className="contact-header">
                  <Col xs={8}>
                    <img src={character.image} alt="character-img" style={{ verticalAlign: "middle" }} />
                  </Col>
                  <Col style={{ marginLeft: 20 }}>
                    <p className="character-name">{character.name}</p>
                  </Col>
                </Row>
              </Header>
              <Content className="site-content">
                <div className="personal-details-container">
                  <p style={{ marginTop: 0 }}>Personal info</p>
                  <div className="personal-details">
                    <Row className="top-row">
                      <Col flex="1 1 100px">
                        <p>Gender</p>
                      </Col>
                      <Col flex="auto">
                        <p>{character.gender || "N/A"}</p>
                      </Col>
                    </Row>
                    <Row className="middle-row">
                      <Col flex="1 1 100px">
                        <p>Status</p>
                      </Col>
                      <Col flex="auto">
                        <p>{character.status || "N/A"}</p>
                      </Col>
                    </Row>
                    <Row className="middle-row">
                      <Col flex="1 1 100px">
                        <p>Species</p>
                      </Col>
                      <Col flex="auto">
                        <p>{character.species || "N/A"}</p>
                      </Col>
                    </Row>
                    <Row className="middle-row">
                      <Col flex="1 1 100px">
                        <p>Location</p>
                      </Col>
                      <Col flex="auto">
                        <p>{character.location.name || "N/A"}</p>
                      </Col>
                    </Row>
                    <Row className="middle-row">
                      <Col flex="1 1 100px">
                        <p>Origin</p>
                      </Col>
                      <Col flex="auto">
                        <p>{character.origin.name}</p>
                      </Col>
                    </Row>
                    <Row className="last-row">
                      <Col flex="1 1 100px">
                        <p>Created Date</p>
                      </Col>
                      <Col flex="auto">
                        <p>{moment(character.created).format("DD/MM/YYYY HH:mm a")}</p>
                      </Col>
                    </Row>
                  </div>
                </div>
                <div className="personal-details-container">
                  <p style={{ marginTop: 0 }}>Episodes</p>
                  <div>
                    <TableEpisodes dataSource={episodes} />
                  </div>
                </div>
              </Content>
            </>
          ) : null}
        </Layout>
      </Spin>
    </ContactDetailStyled>
  );
};

export default ContactDetails;

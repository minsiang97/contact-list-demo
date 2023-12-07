import React, { useCallback, useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import ContactDetailStyled from "./styled";
import Axios from "../../../APIService/axios";
import { GET_CONTACTS_LIST, GET_EPISODES_LIST } from "../../../APIService/APILinks";
import { ContactListState } from "../ContactList";
import { Col, Layout, Row, Spin } from "antd";
import moment from "moment";

const { Header, Content } = Layout;

type EpisodeState = {
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
  const [episodes, setEpisodes] = useState<EpisodeState | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

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
        console.log(response.data);
        setEpisodes(response.data.result);
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

  return (
    <ContactDetailStyled>
      <Spin spinning={true}>
        <Layout style={{ minHeight: "100vh" }}>
          {!loading && character ? (
            <>
              <Header className="site-header">
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
                      <Col xs={8}>
                        <p>Gender</p>
                      </Col>
                      <Col xs={16}>
                        <p>{character.gender}</p>
                      </Col>
                    </Row>
                    <Row className="middle-row">
                      <Col xs={8}>
                        <p>Status</p>
                      </Col>
                      <Col xs={16}>
                        <p>{character.status}</p>
                      </Col>
                    </Row>
                    <Row className="middle-row">
                      <Col xs={8}>
                        <p>Species</p>
                      </Col>
                      <Col xs={16}>
                        <p>{character.species}</p>
                      </Col>
                    </Row>
                    <Row className="middle-row">
                      <Col xs={8}>
                        <p>Location</p>
                      </Col>
                      <Col xs={16}>
                        <p>{character.location.name}</p>
                      </Col>
                    </Row>
                    <Row className="middle-row">
                      <Col xs={8}>
                        <p>Origin</p>
                      </Col>
                      <Col xs={16}>
                        <p>{character.origin.name}</p>
                      </Col>
                    </Row>
                    <Row className="last-row">
                      <Col xs={8}>
                        <p>Created Date</p>
                      </Col>
                      <Col xs={16}>
                        <p>{moment(character.created).format("DD/MM/YYYY HH:mm a")}</p>
                      </Col>
                    </Row>
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

/* eslint-disable react-hooks/exhaustive-deps */

import { Button, Col, Input, RadioChangeEvent, Row, Space, Spin } from "antd";
import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import ContactListStyled from "./styled";
import Axios from "../../../APIService/axios";
import { GET_CONTACTS_LIST } from "../../../APIService/APILinks";
import DropDown from "../../../components/Dropdown";
import { CloseOutlined } from "@ant-design/icons";
import { ContactContext } from "../../../config/context/ContactContextProvider";
import debounce from "lodash/debounce";

export type ContactListState = {
  id: number;
  created: string;
  location: {
    name: string | null;
    url: string | null;
  };
  name: string;
  origin: {
    name: string;
    url: string;
  };
  species: string;
  status: string;
  type: string;
  url: string;
  gender: string;
  episode: [];
  image: string;
};

export type RadioProps = {
  label: string;
  value: string;
};

type GetContactParams = {
  name?: string | undefined;
  status?: string | undefined;
  gender?: string | undefined;
};

const status: RadioProps[] = [
  {
    label: "Alive",
    value: "alive",
  },
  {
    label: "Dead",
    value: "dead",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
];

const gender: RadioProps[] = [
  {
    label: "Male",
    value: "male",
  },
  {
    label: "Female",
    value: "female",
  },
  {
    label: "Genderless",
    value: "genderless",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
];

const ContactList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [bottomLoading, setBottomLoading] = useState<boolean>(false);
  const [radioStatusOpen, setRadioStatusOpen] = useState<boolean>(false);
  const [radioGenderOpen, setRadioGenderOpen] = useState<boolean>(false);
  const [statusValue, setStatusValue] = useState<string>("");
  const [genderValue, setGenderValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [nextPage, setNextPage] = useState<string>("");
  const [contactList, setContactList] = useState<ContactListState[] | []>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const initialRender = useRef(true);
  const contactState = useContext(ContactContext);
  const navigate = useNavigate();
  const { id } = useParams();

  const fetchNextPage = useCallback(async () => {
    setBottomLoading(true);
    try {
      const response = await Axios.get(nextPage);
      if (response.status === 200 && response.data) {
        setNextPage(response.data.info.next);
        setContactList((prevData) => [...prevData, ...response.data.results]);
      }
      setBottomLoading(false);
    } catch (e) {
      console.error(e);
      setBottomLoading(false);
    }
  }, [nextPage]);

  const onScroll = useCallback(
    debounce(() => {
      if (containerRef.current) {
        const { scrollTop, clientHeight, scrollHeight } = containerRef.current;
        if (Math.ceil(scrollTop + clientHeight) >= scrollHeight && nextPage && !loading) {
          fetchNextPage();
        }
      }
    }, 500),
    [nextPage, fetchNextPage]
  );

  const getContacts = async (params?: GetContactParams) => {
    try {
      setLoading(true);
      const response = await Axios.get(GET_CONTACTS_LIST, {
        params,
      });
      if (response.status === 200 && response.data) {
        setNextPage(response.data.info.next);
        setContactList(response.data.results);
        setLoading(false);
      }
    } catch (e: any) {
      if (e.response.status === 404) {
        setContactList([]);
      }
      setLoading(false);
    }
  };

  const debouncedFetchContacts = useCallback(
    debounce((name, status, gender) => {
      const params: GetContactParams = {};
      if (name) params.name = name;
      if (status) params.status = status;
      if (gender) params.gender = gender;
      getContacts(params);
    }, 300),
    []
  );

  useEffect(() => {
    if (!initialRender.current) {
      debouncedFetchContacts(searchValue, statusValue, genderValue);
    } else {
      getContacts();
      initialRender.current = false;
    }
  }, [searchValue, statusValue, genderValue, debouncedFetchContacts]);

  useEffect(() => {
    const currentContainerRef = containerRef.current;
    if (currentContainerRef) {
      currentContainerRef.addEventListener("scroll", onScroll);
    }
    return () => {
      if (currentContainerRef) {
        currentContainerRef.removeEventListener("scroll", onScroll);
      }
    };
  }, [onScroll]);

  const onClickStatusChanged = (e: RadioChangeEvent) => {
    setStatusValue(e.target.value);
    setRadioStatusOpen(false);
  };

  const onClickGenderChanged = (e: RadioChangeEvent) => {
    setGenderValue(e.target.value);
    setRadioGenderOpen(false);
  };

  const clearFilter = () => {
    setGenderValue("");
    setStatusValue("");
    setSearchValue("");
    if (containerRef.current) containerRef.current.scrollTop = 0;
    getContacts();
  };

  const onChangeText = (e: string) => {
    setSearchValue(e);
  };

  const navigateToDetails = (character: ContactListState) => {
    if (id) {
      navigate(`/contact/${character.id}`, { state: character, replace: true });
    } else {
      navigate(`/contact/${character.id}`, { state: character });
    }
  };

  return (
    <ContactListStyled>
      <Row wrap={false}>
        <Col
          ref={containerRef}
          className="list-container"
          flex={`${contactState?.isMobile ? "100vw" : "375px"}`}
          style={loading ? { overflow: "hidden" } : undefined}
        >
          <div className="search-bar-container">
            <p className="contact-title">Contacts</p>
            <Input
              placeholder="Search Characters"
              size="large"
              allowClear
              onChange={(e) => onChangeText(e.target.value)}
              value={searchValue}
            />
            <Row className="filter-row">
              <Space>
                <DropDown
                  title="Status"
                  items={status}
                  trigger="click"
                  open={radioStatusOpen}
                  setOpen={setRadioStatusOpen}
                  onChange={(e: RadioChangeEvent) => onClickStatusChanged(e)}
                  selectedValue={statusValue ? statusValue[0].toUpperCase() + statusValue.substring(1) : ""}
                />
                <DropDown
                  title="Gender"
                  items={gender}
                  trigger="click"
                  open={radioGenderOpen}
                  setOpen={setRadioGenderOpen}
                  onChange={(e: RadioChangeEvent) => onClickGenderChanged(e)}
                  selectedValue={genderValue ? genderValue[0]?.toUpperCase() + genderValue?.substring(1) : ""}
                />
              </Space>
              {searchValue || statusValue || genderValue ? (
                <Button size="small" type="text" onClick={clearFilter}>
                  <Space>
                    Clear Filters
                    <CloseOutlined />
                  </Space>
                </Button>
              ) : null}
            </Row>
          </div>
          <Spin spinning={loading} wrapperClassName="loading-spinner">
            {contactList && contactList.length > 0 ? (
              <>
                {contactList.map((item, index) => {
                  return (
                    <div
                      className={`contact ${id && item.id === parseInt(id) ? "selectedContact" : undefined}`}
                      style={index === contactList.length - 1 ? undefined : { borderBottom: "1px solid #d9d9d9" }}
                      key={item.id}
                      onClick={() => navigateToDetails(item)}
                    >
                      <img src={item.image} alt="character_image" />
                      <div className="character-details">
                        <p>{item.name}</p>
                        <p>{item.species}</p>
                      </div>
                    </div>
                  );
                })}
              </>
            ) : (
              <>
                {!loading ? (
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    No contacts exists
                  </div>
                ) : null}
              </>
            )}
          </Spin>
          {bottomLoading && <Spin style={{ display: "flex", justifyContent: "center" }} spinning={bottomLoading} />}
        </Col>
        <Col className="details-container" flex="auto">
          <Outlet />
        </Col>
      </Row>
    </ContactListStyled>
  );
};

export default ContactList;

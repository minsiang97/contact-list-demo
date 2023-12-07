import { Button, Col, Input, RadioChangeEvent, Row, Space, Spin } from "antd";
import React, { useContext, useEffect, useMemo, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import ContactListStyled from "./styled";
import Axios from "../../../APIService/axios";
import { GET_CONTACTS_LIST } from "../../../APIService/APILinks";
import DropDown from "../../../components/Dropdown";
import { CloseOutlined } from "@ant-design/icons";
import { ContactContext } from "../../../config/context/ContactContextProvider";

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

const status: RadioProps[] = [
  {
    label: "Alive",
    value: "Alive",
  },
  {
    label: "Dead",
    value: "Dead",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
];

const gender: RadioProps[] = [
  {
    label: "Male",
    value: "Male",
  },
  {
    label: "Female",
    value: "Female",
  },
  {
    label: "Genderless",
    value: "Genderless",
  },
  {
    label: "Unknown",
    value: "unknown",
  },
];

const ContactList: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [radioStatusOpen, setRadioStatusOpen] = useState<boolean>(false);
  const [radioGenderOpen, setRadioGenderOpen] = useState<boolean>(false);
  const [statusValue, setStatusValue] = useState<string>("");
  const [genderValue, setGenderValue] = useState<string>("");
  const [searchValue, setSearchValue] = useState<string>("");
  const [contactList, setContactList] = useState<ContactListState[] | null>(null);

  const contactState = useContext(ContactContext);
  const navigate = useNavigate();

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      setLoading(true);
      const response = await Axios.get(GET_CONTACTS_LIST);
      if (response.status === 200 && response.data) {
        setContactList(response.data.results);
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
    }
  };

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
  };

  const contactListWithFilter = useMemo(() => {
    if (genderValue || statusValue) {
      return contactList?.filter((contact) => {
        return (
          (genderValue && contact.gender === genderValue && statusValue && contact.status === statusValue) ||
          (genderValue && !statusValue && contact.gender === genderValue) ||
          (!genderValue && statusValue && contact.status === statusValue)
        );
      });
    }
    return contactList;
  }, [contactList, genderValue, statusValue]);

  const filteredContactList = useMemo(() => {
    if (searchValue)
      return contactListWithFilter?.filter((contact) => contact.name.toLowerCase().includes(searchValue.toLowerCase()));
    return contactListWithFilter;
  }, [contactListWithFilter, searchValue]);

  const onChangeText = (e: string) => {
    setSearchValue(e);
  };

  const navigateToDetails = (character: ContactListState) => {
    navigate(`/contact/${character.id}`, { state: character });
  };

  return (
    <ContactListStyled>
      <Row>
        <Col className="list-container" flex={`${contactState?.isMobile ? "100vw" : "360px"}`}>
          <div className="search-bar-container">
            <p className="contact-title">Contacts</p>
            <Input
              placeholder="Search Characters"
              size="large"
              allowClear
              onChange={(e) => onChangeText(e.target.value)}
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
                  selectedValue={statusValue}
                />
                <DropDown
                  title="Gender"
                  items={gender}
                  trigger="click"
                  open={radioGenderOpen}
                  setOpen={setRadioGenderOpen}
                  onChange={(e: RadioChangeEvent) => onClickGenderChanged(e)}
                  selectedValue={genderValue}
                />
                <Button type="text" onClick={clearFilter}>
                  <Space>
                    Clear filter
                    <CloseOutlined />
                  </Space>
                </Button>
              </Space>
            </Row>
          </div>
          <Spin spinning={loading}>
            {filteredContactList &&
              filteredContactList.length > 0 &&
              filteredContactList.map((item, index) => {
                return (
                  <div
                    className="contact"
                    style={index === filteredContactList.length - 1 ? undefined : { borderBottom: "1px solid #d9d9d9" }}
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
          </Spin>
        </Col>
        <Col className="details-container" flex="1">
          <Outlet />
        </Col>
      </Row>
    </ContactListStyled>
  );
};

export default ContactList;

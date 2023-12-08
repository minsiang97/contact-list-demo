import React, { useMemo } from "react";
import { Table } from "antd";
import moment from "moment";
import { EpisodeState } from ".";

const getColumnsTranslated = () => [
  {
    title: "Name",
    key: "name",
    dataIndex: "name",
    fixed: true,
  },
  {
    title: "Air Date",
    dataIndex: "air_date",
    key: "air_date",
  },
  {
    title: "Episode",
    dataIndex: "episode",
    key: "episode",
  },
  {
    title: "Created Date",
    dataIndex: "created",
    key: "created",
    render: (value: string) => moment(value).format("DD/MM/YYYY HH:mm a"),
  },
];

interface TableEpisodesProps {
  dataSource: EpisodeState[] | undefined;
}

const TableEpisodes: React.FC<TableEpisodesProps> = (props) => {
  const { dataSource } = props;
  const columns = useMemo(() => getColumnsTranslated(), []);
  return (
    <>
      <Table rowKey={(record) => record.id} columns={columns} dataSource={dataSource} scroll={{ x: 800 }} />
    </>
  );
};

export default TableEpisodes;
